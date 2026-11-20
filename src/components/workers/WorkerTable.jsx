import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeWorker } from "../../app/redux/actions/workers";

function WorkerTable({ onEdit }) {
  const dispatch = useDispatch();
   const session = JSON.parse(
  localStorage.getItem("agri_session") || "null"
);

   const userRole = (
    session?.user?.userType ||
    session?.userType ||
    session?.role ||
    ""
   ).toLowerCase();

const isAdmin = userRole === "admin";
  const workers = useSelector(
    (state) => state.workers?.workers ?? []
  );

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Search and filter workers
  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      worker.cnic?.includes(search);

    const matchesRole =
      roleFilter === "All" || worker.role === roleFilter;

    const matchesStatus =
      statusFilter === "All" || worker.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Delete worker
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      dispatch(removeWorker(id));
    }
  };

  return (
    <section className="worker-table-section">
      <h3>Worker Records</h3>

      <p>Total Workers: {workers.length}</p>

      {/* Search */}
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or CNIC"
        className="form-control mb-3"
      />

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="worker-role-filter">Filter by Role</label>

          <select
            id="worker-role-filter"
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Farm Hand">Farm Hand</option>
            <option value="Driver">Driver</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Sprayer">Sprayer</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="worker-status-filter">Filter by Status</label>

          <select
            id="worker-status-filter"
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Workers Table */}
      {filteredWorkers.length === 0 ? (
        <p>No workers found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered worker-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>CNIC</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Daily Wage</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredWorkers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.fullName}</td>
                  <td>{worker.cnic}</td>
                  <td>{worker.phone}</td>
                  <td>{worker.role}</td>
                  <td>
                    PKR {Number(worker.dailyWage || 0).toLocaleString()}
                  </td>
                  <td>{worker.joinDate || "—"}</td>
                  <td>{worker.status}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => onEdit(worker)}
                    >
                      Edit
                    </button>

                     {isAdmin && (
                     <button
                       type="button"
                       className="btn btn-danger btn-sm"
                       onClick={() => handleDelete(worker.id)}
                      >
                        Delete
                     </button>
                     )}
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

export default WorkerTable;