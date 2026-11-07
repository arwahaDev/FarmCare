import { useState } from "react";

import WorkerForm from "../components/workers/WorkerForm";
import WorkerTable from "../components/workers/WorkerTable";
import AttendanceRegister from "../components/workers/AttendanceRegister";
import WageSummary from "../components/workers/WageSummary";

function Workers() {
  const [editingWorker, setEditingWorker] = useState(null);

  const handleEdit = (worker) => {
    setEditingWorker(worker);
  };

  const handleCancelEdit = () => {
    setEditingWorker(null);
  };

  return (
    <div className="container-fluid workers-page">

      <div className="mb-4">
        <h2>Workers Management</h2>
        <p>
          Manage farm workers, daily attendance and monthly wages.
        </p>
      </div>

      {/* Worker Form */}
      <div className="card p-3 mb-4">
        <WorkerForm
          editingWorker={editingWorker}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {/* Worker Records */}
      <div className="card p-3 mb-4">
        <WorkerTable onEdit={handleEdit} />
      </div>

      {/* Attendance Register */}
      <div className="card p-3 mb-4">
        <AttendanceRegister />
      </div>

      {/* Monthly Wage Summary */}
      <div className="card p-3 mb-4">
        <WageSummary />
      </div>

    </div>
  );
}

export default Workers;