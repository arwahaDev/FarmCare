import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorker,
  updateWorker,
} from "../../app/redux/actions/workers";
function WorkerForm({ editingWorker, onCancelEdit }) {
  const dispatch = useDispatch();

  const workers = useSelector(
    (state) => state.workers?.workers ?? []
  );

  const [fullName, setFullName] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Farm Hand");
  const [dailyWage, setDailyWage] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [status, setStatus] = useState("Active");

  const [error, setError] = useState("");

  // Load worker data when editing
  useEffect(() => {
    if (editingWorker) {
      setFullName(editingWorker.fullName || "");
      setCnic(editingWorker.cnic || "");
      setPhone(editingWorker.phone || "");
      setRole(editingWorker.role || "Farm Hand");
      setDailyWage(editingWorker.dailyWage || "");
      setJoinDate(editingWorker.joinDate || "");
      setStatus(editingWorker.status || "Active");
    }
  }, [editingWorker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Name validation
    if (!/^[A-Za-z ]{3,}$/.test(fullName.trim())) {
      setError("Name must contain at least 3 letters.");
      return;
    }

    // CNIC validation
    if (!/^\d{13}$/.test(cnic)) {
      setError("CNIC must contain exactly 13 digits.");
      return;
    }

    // Duplicate CNIC validation
    const duplicateCNIC = workers.some(
      (worker) =>
        worker.cnic === cnic &&
        worker.id !== editingWorker?.id
    );

    if (duplicateCNIC) {
      setError("This CNIC is already registered.");
      return;
    }

    // Phone validation
    if (!/^\d{11}$/.test(phone)) {
      setError("Phone number must contain exactly 11 digits.");
      return;
    }

    // Wage validation
    if (!dailyWage || Number(dailyWage) <= 0) {
      setError("Daily wage must be greater than zero.");
      return;
    }

    if (!joinDate) {
      setError("Please select joining date.");
      return;
    }

    const workerData = {
      ...(editingWorker || {}),
      fullName: fullName.trim(),
      cnic,
      phone,
      role,
      dailyWage: Number(dailyWage),
      joinDate,
      status,
    };

    if (editingWorker) {
      dispatch(updateWorker(workerData));
    } else {
      dispatch(addWorker({
        ...workerData,
        id: Date.now(),
      }));
    }

    handleReset();
  };

  const handleReset = () => {
    setFullName("");
    setCnic("");
    setPhone("");
    setRole("Farm Hand");
    setDailyWage("");
    setJoinDate("");
    setStatus("Active");
    setError("");

    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form className="worker-form" onSubmit={handleSubmit}>
      <h3>
        {editingWorker ? "Update Worker" : "Add New Worker"}
      </h3>

      <label htmlFor="worker-name">Full Name</label>
      <input
        id="worker-name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter full name"
        required
      />

      <label htmlFor="worker-cnic">CNIC</label>
      <input
        id="worker-cnic"
        type="text"
        inputMode="numeric"
        maxLength="13"
        value={cnic}
        onChange={(e) =>
          setCnic(e.target.value.replace(/\D/g, ""))
        }
        placeholder="13 digit CNIC"
        required
      />

      <label htmlFor="worker-phone">Phone Number</label>
      <input
        id="worker-phone"
        type="tel"
        inputMode="numeric"
        maxLength="11"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value.replace(/\D/g, ""))
        }
        placeholder="03XXXXXXXXX"
        required
      />

      <label htmlFor="worker-role">Worker Role</label>
      <select
        id="worker-role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Farm Hand">Farm Hand</option>
        <option value="Driver">Driver</option>
        <option value="Supervisor">Supervisor</option>
        <option value="Sprayer">Sprayer</option>
      </select>

      <label htmlFor="worker-wage">Daily Wage (PKR)</label>
      <input
        id="worker-wage"
        type="number"
        min="1"
        value={dailyWage}
        onChange={(e) => setDailyWage(e.target.value)}
        placeholder="Enter daily wage"
        required
      />

      <label htmlFor="worker-join-date">Joining Date</label>
      <input
        id="worker-join-date"
        type="date"
        value={joinDate}
        onChange={(e) => setJoinDate(e.target.value)}
        required
      />

      <label htmlFor="worker-status">Status</label>
      <select
        id="worker-status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      {error && (
        <p className="text-danger">{error}</p>
      )}

      <button type="submit">
        {editingWorker ? "Update Worker" : "Add Worker"}
      </button>

      {editingWorker && (
        <button type="button" onClick={handleReset}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default WorkerForm;