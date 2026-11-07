import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  markAttendance,
  updateAttendance,
  removeAttendance,
} from "../../app/redux/actions/attendance";

function AttendanceRegister() {
  const dispatch = useDispatch();

  const workers = useSelector(
    (state) => state.workers?.workers ?? []
  );

  const records = useSelector(
    (state) => state.attendance?.records ?? []
  );

  const [workerId, setWorkerId] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState("Present");
  const [editingRecord, setEditingRecord] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!workerId || !date || !status) {
      alert("Please fill all fields.");
      return;
    }

    const attendanceData = {
      workerId: Number(workerId),
      date,
      status,
    };

    if (editingRecord) {
      dispatch(
        updateAttendance({
          ...editingRecord,
          ...attendanceData,
        })
      );

      setEditingRecord(null);
    } else {
      const alreadyMarked = records.some(
        (record) =>
          String(record.workerId) === workerId &&
          record.date === date
      );

      if (alreadyMarked) {
        alert("Attendance already marked for this worker on this date.");
        return;
      }

      dispatch(
        markAttendance({
          ...attendanceData,
          id: Date.now(),
        })
      );
    }

    setWorkerId("");
    setStatus("Present");
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setWorkerId(String(record.workerId));
    setDate(record.date);
    setStatus(record.status);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this attendance record?")) {
      dispatch(removeAttendance(id));
    }
  };

  const getWorkerName = (id) => {
    const worker = workers.find(
      (item) => String(item.id) === String(id)
    );

    return worker ? worker.fullName : "Unknown Worker";
  };

  return (
    <section className="attendance-register">
      <h3>Attendance Register</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="attendance-worker">Select Worker</label>

          <select
            id="attendance-worker"
            className="form-select"
            value={workerId}
            onChange={(e) => setWorkerId(e.target.value)}
            required
          >
            <option value="">Choose Worker</option>

            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="attendance-date">Date</label>

          <input
            id="attendance-date"
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="attendance-status">Status</label>

          <select
            id="attendance-status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Half-day">Half-day</option>
            <option value="Leave">Leave</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          {editingRecord ? "Update Attendance" : "Mark Attendance"}
        </button>

        {editingRecord && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingRecord(null);
              setWorkerId("");
              setStatus("Present");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h4>Attendance Records</h4>

      {records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{getWorkerName(record.workerId)}</td>
                  <td>{record.date}</td>
                  <td>{record.status}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(record)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AttendanceRegister;