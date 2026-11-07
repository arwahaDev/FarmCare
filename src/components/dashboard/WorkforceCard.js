import { useSelector } from "react-redux";

function WorkerforceCard() {
  const workers = useSelector(
    (state) => state.workers?.workers ?? []
  );

  const attendance = useSelector(
    (state) => state.attendance?.records ?? []
  );

  const activeWorkers = workers.filter(
    (worker) => worker.status === "Active"
  );

  const today = new Date().toISOString().split("T")[0];

  const todayAttendance = attendance.filter(
    (record) => record.date === today
  );

  const presentWorkers = todayAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentWorkers = todayAttendance.filter(
    (record) => record.status === "Absent"
  ).length;

  return (
    <section className="dashboard-section">
      <div className="section-heading-row">
        <div>
          <span className="section-kicker">
            WORKFORCE MANAGEMENT
          </span>
          <h2>Workerforce Overview</h2>
        </div>
      </div>

      <div className="dashboard-stats-grid">

        <div className="dashboard-panel">
          <h3>Total Workers</h3>
          <h2>{workers.length}</h2>
        </div>

        <div className="dashboard-panel">
          <h3>Active Workers</h3>
          <h2>{activeWorkers.length}</h2>
        </div>

        <div className="dashboard-panel">
          <h3>Present Today</h3>
          <h2>{presentWorkers}</h2>
        </div>

        <div className="dashboard-panel">
          <h3>Absent Today</h3>
          <h2>{absentWorkers}</h2>
        </div>

      </div>
    </section>
  );
}

export default WorkerforceCard;