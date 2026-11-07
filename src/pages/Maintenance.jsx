import { useState } from "react";
import { useDispatch } from "react-redux";

import MaintenanceForm from "../components/equipment/MaintenanceForm";
import MaintenanceLog from "../components/equipment/MaintenanceLog";

import { removeService } from "../app/redux/actions/maintenance";

function Maintenance() {
  const dispatch = useDispatch();

  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const handleDelete = (service) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this maintenance record?"
    );

    if (confirmed) {
      dispatch(removeService(service.id));
    }
  };

  const handleAdd = () => {
    setSelectedService(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setSelectedService(null);
    setShowForm(false);
  };

  return (
    <div className="container-fluid maintenance-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Maintenance Management</h2>
          <p className="text-muted">
            Manage equipment maintenance records and service history.
          </p>
        </div>

        <button className="btn btn-success" onClick={handleAdd}>
          + Add Maintenance
        </button>
      </div>

      {showForm && (
        <MaintenanceForm
          service={selectedService}
          onClose={handleClose}
        />
      )}

      <MaintenanceLog
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Maintenance;