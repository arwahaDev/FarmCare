// ==========================================
// AGRICULTURE MANAGEMENT SYSTEM
// REDUX SELECTORS
// ==========================================


// ------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getDaysDifference = (date) => {
  const targetDate = new Date(date);

  if (Number.isNaN(targetDate.getTime())) {
    return null;
  }

  targetDate.setHours(0, 0, 0, 0);

  const difference = targetDate.getTime() - getToday().getTime();

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
};


// ------------------------------------------
// 1. LOW STOCK SELECTOR
// ------------------------------------------

export const selectLowStock = (state) => {
  const items = state.inventory?.items ?? state.inventory?.inventory ?? [];

  return items.filter((item) => {
    const quantity = Number(item.qty ?? item.quantity ?? item.stock ?? 0);
    const minimum = Number(item.minQty ?? item.lowStockThreshold ?? 10);

    return quantity <= minimum;
  });
};


// ------------------------------------------
// 2. DUE CROPS SELECTOR
// ------------------------------------------

export const selectDueCrops = (state) => {
  const crops = state.crops?.crops ?? [];

  return crops.filter((crop) => {
    if (!crop.cuttingDate) {
      return false;
    }

    const daysRemaining = getDaysDifference(crop.cuttingDate);

    return daysRemaining !== null && daysRemaining <= 3;
  });
};


// ------------------------------------------
// 3. PROFIT BY CROP SELECTOR
// ------------------------------------------

export const selectProfitByCrop = (state) => {
  const crops = state.crops?.crops ?? [];
  const orders = state.orders?.orders ?? [];
  const expenses = state.expenses?.expenses ?? [];

  return crops.map((crop) => {
    // Get orders belonging to this crop
    const cropOrders = orders.filter(
      (order) =>
        String(order.cropId) === String(crop.id) &&
        order.status === "Delivered"
    );

    // Get expenses belonging to this crop
    const cropExpenses = expenses.filter(
      (expense) =>
        String(expense.cropId) === String(crop.id)
    );

    // Calculate revenue from delivered orders
    const revenue = cropOrders.reduce((total, order) => {
      const amount = Number(
        order.totalAmount ??
        (Number(order.quantity ?? 0) *
          Number(order.sellingPricePerKg ?? 0))
      );

      return total + (Number.isFinite(amount) ? amount : 0);
    }, 0);

    // Calculate total crop expenses
    const totalCost = cropExpenses.reduce((total, expense) => {
      const amount = Number(expense.amount ?? 0);

      return total + (
        Number.isFinite(amount) ? amount : 0
      );
    }, 0);

    // Calculate profit or loss
    const profit = revenue - totalCost;

    return {
      cropId: crop.id,
      cropName: crop.name,
      revenue,
      totalCost,
      profit,
    };
  });
};


// ------------------------------------------
// 4. WORKERS PRESENT TODAY
// ------------------------------------------

export const selectWorkersPresentToday = (state) => {
  const workers = state.workers?.workers ?? [];
  const attendance = state.attendance?.records ?? [];

  const today = getToday().toISOString().split("T")[0];

  const presentRecords = attendance.filter((record) => {
    return (
      record.date === today &&
      record.status === "Present"
    );
  });

  return presentRecords
    .map((record) =>
      workers.find(
        (worker) =>
          String(worker.id) === String(record.workerId)
      )
    )
    .filter(Boolean);
};


// ------------------------------------------
// 5. WORKERS ABSENT TODAY
// ------------------------------------------

export const selectWorkersAbsentToday = (state) => {
  const workers = state.workers?.workers ?? [];
  const attendance = state.attendance?.records ?? [];

  const today = getToday().toISOString().split("T")[0];

  const absentRecords = attendance.filter((record) => {
    return (
      record.date === today &&
      record.status === "Absent"
    );
  });

  return absentRecords
    .map((record) =>
      workers.find(
        (worker) =>
          String(worker.id) === String(record.workerId)
      )
    )
    .filter(Boolean);
};


// ------------------------------------------
// 6. WAGES PAYABLE SELECTOR
// ------------------------------------------

export const selectWagesPayable = (month) => (state) => {

  const workers = state.workers?.workers ?? [];
  const attendance = state.attendance?.records ?? [];

  const selectedMonth =
    month ?? new Date().toISOString().slice(0, 7);

  return workers
    .filter((worker) => worker.status === "Active")
    .map((worker) => {

      const workerRecords = attendance.filter((record) => {
        return (
          String(record.workerId) === String(worker.id) &&
          record.date?.slice(0, 7) === selectedMonth
        );
      });

      const presentDays = workerRecords.filter(
        (record) => record.status === "Present"
      ).length;

      const halfDays = workerRecords.filter(
        (record) => record.status === "Half-day"
      ).length;

      const absentDays = workerRecords.filter(
        (record) => record.status === "Absent"
      ).length;

      const leaveDays = workerRecords.filter(
        (record) => record.status === "Leave"
      ).length;

      const dailyWage = Number(worker.dailyWage ?? 0);

      const payableDays = presentDays + (0.5 * halfDays);

      const wagesPayable = payableDays * dailyWage;

      return {
        workerId: worker.id,
        workerName: worker.fullName,
        dailyWage,
        presentDays,
        halfDays,
        absentDays,
        leaveDays,
        payableDays,
        wagesPayable,
      };
    });
};


// ------------------------------------------
// 7. TOTAL WAGES PAYABLE
// ------------------------------------------

export const selectTotalWagesPayable = (month) => (state) => {

  const wages = selectWagesPayable(month)(state);

  return wages.reduce(
    (total, worker) => total + worker.wagesPayable,
    0
  );
};


// ------------------------------------------
// 8. EQUIPMENT SERVICE DUE SELECTOR
// ------------------------------------------

export const selectServiceDue = (state) => {

  const equipment = state.equipment?.equipment ?? [];

  return equipment
    .map((item) => {

      const lastServiceDate = new Date(item.lastServiceDate);

      if (
        !item.lastServiceDate ||
        Number.isNaN(lastServiceDate.getTime())
      ) {
        return null;
      }

      const serviceInterval = Number(
        item.serviceIntervalDays ?? 0
      );

      const nextServiceDate = new Date(lastServiceDate);

      nextServiceDate.setDate(
        nextServiceDate.getDate() + serviceInterval
      );

      const daysRemaining = getDaysDifference(nextServiceDate);

      let serviceStatus = "OK";

      if (daysRemaining < 0) {
        serviceStatus = "Overdue";
      } else if (daysRemaining <= 7) {
        serviceStatus = "Due in 7 days";
      }

      return {
        ...item,
        nextServiceDate: nextServiceDate
          .toISOString()
          .split("T")[0],
        daysRemaining,
        serviceStatus,
      };
    })
    .filter(Boolean)
    .filter((item) => item.daysRemaining <= 7)
    .sort(
      (a, b) => a.daysRemaining - b.daysRemaining
    )
    .slice(0, 5);
};


// ------------------------------------------
// 9. SELECT ALERTS
// ------------------------------------------

export const selectAlerts = (state) => {

  const alerts = [];

  const lowStock = selectLowStock(state);
  const dueCrops = selectDueCrops(state);
  const profitData = state.crops?.crops ?? [];
  const tasks = state.tasks?.tasks ?? [];
  const weather = state.weather?.data ?? {};
  const workers = state.workers?.workers ?? [];
  const absentWorkers = selectWorkersAbsentToday(state);
  const serviceDue = selectServiceDue(state);
  const equipment = state.equipment?.equipment ?? [];

  // Low stock alerts

  lowStock.forEach((item) => {
    alerts.push({
      id: `stock-${item.id}`,
      type: "Low Stock",
      message: `${item.item} stock is low.`,
      severity: "warning",
    });
  });

  // Crop cutting alerts

  dueCrops.forEach((crop) => {
    alerts.push({
      id: `crop-${crop.id}`,
      type: "Crop Due",
      message: `${crop.name} cutting date is near or overdue.`,
      severity: "warning",
    });
  });
  // Critical crop alerts
  profitData
    .filter((crop) => {
      return (
        crop.status === "Critical" ||
        Number(crop.healthScore) < 40
      );
    })
    .forEach((crop) => {
      alerts.push({
        id: `critical-${crop.id}`,
        type: "Critical Crop",
        message: `${crop.name} needs immediate attention.`,
        severity: "danger",
      });
    });
  // Overdue task alerts
  tasks
    .filter((task) => {
      const daysRemaining = getDaysDifference(task.dueDate);
      return (
        task.status !== "Done" &&
        daysRemaining !== null &&
        daysRemaining < 0
      );
    })
    .forEach((task) => {
      alerts.push({
        id: `task-${task.id}`,
        type: "Overdue Task",
        message: `${task.title} is overdue.`,
        severity: "danger",
      });
    });
  // High humidity alert
  if (Number(weather.humidity) > 80) {
    alerts.push({
      id: "high-humidity",
      type: "High Humidity",
      message: "Humidity is above 80%.",
      severity: "warning",
    });
  }
  // High worker absence alert
  const activeWorkers = workers.filter(
    (worker) => worker.status === "Active"
  );
  const absencePercentage =
    activeWorkers.length > 0
      ? (absentWorkers.length / activeWorkers.length) * 100
      : 0;
  if (absencePercentage > 30) {
    alerts.push({
      id: "high-absence",
      type: "Worker Absence",
      message: "More than 30% of active workers are absent today.",
      severity: "warning",
    });
  }
  // Equipment service alerts
  serviceDue
    .filter((item) => item.serviceStatus === "Overdue")
    .forEach((item) => {
      alerts.push({
        id: `service-${item.id}`,
        type: "Service Overdue",
        message: `${item.name} service is overdue.`,
        severity: "danger",
      });
    });
  // Equipment under repair alerts
  equipment
    .filter((item) => item.status === "Under Repair")
    .forEach((item) => {
      alerts.push({
        id: `repair-${item.id}`,
        type: "Equipment Under Repair",
        message: `${item.name} is currently under repair.`,
        severity: "warning",
      });
    });
  return alerts;
};
// ------------------------------------------
// 10. EQUIPMENT STATUS COUNT SELECTOR
// ------------------------------------------
export const selectEquipmentStatusCount = (state) => {
  const equipment = state.equipment?.equipment ?? [];
  const active = equipment.filter(
    (item) => item.status === "Active"
  ).length;
  const underRepair = equipment.filter(
    (item) => item.status === "Under Repair"
  ).length;
  const idle = equipment.filter(
    (item) => item.status === "Idle"
  ).length;
  return {
    total: equipment.length,
    active,
    underRepair,
    idle,
  };
};
// ==========================================
// WORKERS SELECTORS
// ==========================================

// 1. Get All Workers
export const selectAllWorkers = (state) => {
  return state.workers?.workers ?? [];
};

// 2. Get Active Workers
export const selectActiveWorkers = (state) => {
  return selectAllWorkers(state).filter(
    (worker) => worker.status === "Active"
  );
};

// 3. Get Inactive Workers
export const selectInactiveWorkers = (state) => {
  return selectAllWorkers(state).filter(
    (worker) => worker.status === "Inactive"
  );
};

// 4. Get Total Workers
export const selectTotalWorkers = (state) => {
  return selectAllWorkers(state).length;
};

// 5. Get Workers By Role
export const selectWorkersByRole = (role) => (state) => {
  return selectAllWorkers(state).filter(
    (worker) => worker.role === role
  );
};
// ===============================
// ATTENDANCE SELECTORS
// ===============================

// Get all attendance records
export const selectAllAttendance = (state) => {
  return state.attendance?.records ?? [];
};

// Get attendance by date
export const selectAttendanceByDate = (date) => (state) => {
  return selectAllAttendance(state).filter(
    (record) => record.date === date
  );
};

// Get present workers
export const selectPresentWorkers = (state) => {
  return selectAllAttendance(state).filter(
    (record) => record.status === "Present"
  );
};

// Get absent workers
export const selectAbsentWorkers = (state) => {
  return selectAllAttendance(state).filter(
    (record) => record.status === "Absent"
  );
};

// Get attendance by worker
export const selectWorkerAttendance = (workerId) => (state) => {
  return selectAllAttendance(state).filter(
    (record) => record.workerId === workerId
  );
};
// Get all equipment
export const selectAllEquipment = (state) =>
  state.equipment?.equipment ?? [];

// Get total equipment count
export const selectTotalEquipment = (state) =>
  selectAllEquipment(state).length;

// Get active equipment
export const selectActiveEquipment = (state) =>
  selectAllEquipment(state).filter(
    (item) => item.status === "Active"
  );

// Get equipment under repair
export const selectEquipmentUnderRepair = (state) =>
  selectAllEquipment(state).filter(
    (item) => item.status === "Under Repair"
  );

// Get idle equipment
export const selectIdleEquipment = (state) =>
  selectAllEquipment(state).filter(
    (item) => item.status === "Idle"
  );

// Get equipment by type
export const selectEquipmentByType = (type) => (state) =>
  selectAllEquipment(state).filter(
    (item) => item.type === type
  );
  export const selectNextServicesDue = (state) => {
  const equipment = selectAllEquipment(state);
  const today = new Date();
  const nextSevenDays = new Date();
  nextSevenDays.setDate(today.getDate() + 7);
  return equipment.filter((item) => {
    if (!item.nextServiceDate) return false;
    const serviceDate = new Date(item.nextServiceDate);
    return serviceDate >= today && serviceDate <= nextSevenDays;
  });
};
export const selectOverdueServices = (state) => {
  const equipment = selectAllEquipment(state);
  const today = new Date();
  return equipment.filter((item) => {
    if (!item.nextServiceDate) return false;

    return new Date(item.nextServiceDate) < today;
  });
};
export const selectAllMaintenance = (state) =>
  state.maintenance?.services ?? [];

export const selectTotalMaintenance = (state) =>
  selectAllMaintenance(state).length;

export const selectMaintenanceByEquipment = (equipmentId) => (state) =>
  selectAllMaintenance(state).filter(
    (item) => item.equipmentId === equipmentId
  );

export const selectTotalMaintenanceCost = (state) =>
  selectAllMaintenance(state).reduce(
    (total, item) => total + Number(item.cost || 0),
    0
  );
  // ==========================================
// USER ROLE SELECTORS
// ==========================================

// Get currently logged-in user
export const selectCurrentUser = (state) =>
  state.user?.currentUser ?? null;

// Get current user's role
export const selectUserRole = (state) =>
  selectCurrentUser(state)?.role ?? null;

// Check Admin role
export const selectIsAdmin = (state) =>
  selectUserRole(state) === "Admin";

// Check Manager role
export const selectIsManager = (state) =>
  selectUserRole(state) === "Manager";

// Check authentication
export const selectIsAuthenticated = (state) =>
  Boolean(state.user?.isAuthenticated);
