import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllEquipment } from "../../app/redux/selectors";

function ServiceDuePanel() {
  const equipment = useSelector(selectAllEquipment);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const services = equipment
    .filter((item) => item.nextServiceDate)
    .map((item) => {
      const serviceDate = new Date(item.nextServiceDate);
      serviceDate.setHours(0, 0, 0, 0);

      const daysRemaining = Math.ceil(
        (serviceDate - today) / (1000 * 60 * 60 * 24)
      );

      return { ...item, daysRemaining };
    })
    .filter((item) => item.daysRemaining <= 7)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  return (
    <div className="card shadow-sm border-0 p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Service Due Panel</h5>

        <Link to="/equipment" className="btn btn-sm btn-outline-success">
          View Equipment
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="text-muted mb-0">
          No upcoming or overdue services.
        </p>
      ) : (
        services.map((item) => (
          <div
            key={item.id}
            className={`d-flex justify-content-between align-items-center border-bottom py-3 ${
              item.daysRemaining < 0 ? "text-danger" : ""
            }`}
          >
            <div>
              <strong>{item.name}</strong>
              <div className="small text-muted">
                Service date: {item.nextServiceDate}
              </div>
            </div>

            <span
              className={`badge ${
                item.daysRemaining < 0
                  ? "bg-danger"
                  : item.daysRemaining === 0
                  ? "bg-warning text-dark"
                  : "bg-success"
              }`}
            >
              {item.daysRemaining < 0
                ? `${Math.abs(item.daysRemaining)} days overdue`
                : item.daysRemaining === 0
                ? "Due today"
                : `${item.daysRemaining} days remaining`}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default ServiceDuePanel;