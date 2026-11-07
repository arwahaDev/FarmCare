import { KEYS, writeList } from "../api";

export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const shouldPersist =
    typeof action.type === "string" &&
    (
      action.type.toLowerCase().endsWith("_success") ||

      // Expenses
      action.type === "ADDEXPENSE" ||
      action.type === "UPDATEEXPENSE" ||
      action.type === "REMOVEEXPENSE" ||
      action.type === "GETEXPENSES" ||

      // Inventory
      action.type === "ADDINVENTORY" ||
      action.type === "UPDATEINVENTORY" ||
      action.type === "REMOVEINVENTORY" ||
      action.type === "GETINVENTORY" ||

      // Workers
      action.type === "ADDWORKER" ||
      action.type === "UPDATEWORKER" ||
      action.type === "REMOVEWORKER" ||
      action.type === "GETWORKERS" ||

      // Attendance
      action.type === "GETATTENDANCE" ||
      action.type === "MARKATTENDANCE" ||
      action.type === "UPDATEATTENDANCE" ||
      action.type === "REMOVEATTENDANCE" ||

      // Equipment
      action.type === "GETEQUIPMENT" ||
      action.type === "ADDEQUIPMENT" ||
      action.type === "UPDATEEQUIPMENT" ||
      action.type === "REMOVEEQUIPMENT"
    );

  if (shouldPersist) {
    try {
      const state = store.getState();

      const dataToSave = {
        crops: state.crops?.crops ?? [],
        orders: state.orders?.orders ?? [],
        buyers: state.buyers?.buyers ?? [],
        tasks: state.tasks?.tasks ?? [],
        expenses: state.expenses?.expenses ?? [],
        inventory: state.inventory?.items ?? state.inventory?.inventory ?? [],
        workers: state.workers?.workers ?? [],
        attendance: state.attendance?.records ?? [],
        equipment: state.equipment?.equipment ?? [],
        maintenance: state.maintenance?.services ?? [],
        activity: state.activity?.logs ?? [],
      };

      Object.entries(dataToSave).forEach(([key, value]) => {
        if (KEYS[key]) {
          writeList(KEYS[key], value);
        }
      });

      const currentUser = state.user?.user ?? null;

      if (currentUser) {
        localStorage.setItem(
          KEYS.session,
          JSON.stringify(currentUser)
        );
      } else if (action.type === "user/logout_success") {
        localStorage.removeItem(KEYS.session);
      }

      const theme = state.ui?.theme;

      if (theme) {
        localStorage.setItem("agri_theme", theme);
      }
    } catch (error) {
      console.error("Persistence Middleware Error:", error);
    }
  }

  return result;
};