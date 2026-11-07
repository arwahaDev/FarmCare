import { useSelector } from "react-redux";
import { selectAllMaintenance, selectAllEquipment } from "../../app/redux/selectors";

function MaintenanceLog({ onEdit, onDelete }) {
  const maintenance = useSelector(selectAllMaintenance);
  const equipment = useSelector(selectAllEquipment);

  const getEquipmentName = (equipmentId) => {
  const item = equipment.find(
    (equipmentItem) =>
      String(equipmentItem.id) === String(equipmentId)
  );

  return item ? item.name : "Unknown Equipment";
};

  if (maintenance.length === 0) {
    return (
      <div className="alert alert-info">
        No maintenance records found.
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 p-3">
      <h5 className="mb-3">Maintenance History</h5>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Equipment</th>
              <th>Service Date</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Performed By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {maintenance.map((item) => (
              <tr key={item.id}>
                <td>{getEquipmentName(item.equipmentId)}</td>
                <td>{item.serviceDate}</td>
                <td>{item.description}</td>
                <td>Rs. {Number(item.cost || 0).toLocaleString()}</td>
                <td>{item.performedBy || "—"}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit?.(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete?.(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceLog;