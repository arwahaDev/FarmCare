import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEquipment,
  removeEquipment,
} from "../../app/redux/actions/equipment";

function EquipmentTable({ onEdit }) {
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
  const equipment = useSelector(
    (state) => state.equipment?.equipment ?? []
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.model?.toLowerCase().includes(search.toLowerCase()) ||
      item.type?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this equipment?"
    );

    if (confirmed) {
      dispatch(removeEquipment(id));
    }
  };

  return (
    <div className="equipment-table">
      <h3>Equipment Records</h3>

      <div className="row mb-3">
        <div className="col-md-7 mb-2">
          <input
            type="search"
            className="form-control"
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-5 mb-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Under Repair">Under Repair</option>
            <option value="Idle">Idle</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Model</th>
              <th>Purchase Date</th>
              <th>Last Service</th>
              <th>Next Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.model}</td>
                  <td>{item.purchaseDate}</td>
                  <td>{item.lastServiceDate || "Not recorded"}</td>
                  <td>{item.nextServiceDate || "Not scheduled"}</td>
                  <td>
                    <span className="badge bg-success">
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>

                        ,{isAdmin && (
  <button
    type="button"
    className="btn btn-sm btn-danger"
    onClick={() => handleDelete(item.id)}
  >
    Delete
  </button>
)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No equipment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EquipmentTable;