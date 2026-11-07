import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addService,
  updateService,
} from "../../app/redux/actions/maintenance";

import {
  createMaintenance,
  updateMaintenance,
} from "../../app/redux/api/maintenance";

import { selectAllEquipment } from "../../app/redux/selectors";

function MaintenanceForm({ service, onClose }) {
  const dispatch = useDispatch();
  const equipment = useSelector(selectAllEquipment);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    equipmentId: "",
    serviceDate: "",
    description: "",
    cost: "",
    performedBy: "",
  });

  useEffect(() => {
    if (service) {
      setFormData({
        equipmentId: service.equipmentId || "",
        serviceDate: service.serviceDate || "",
        description: service.description || "",
        cost: service.cost ?? "",
        performedBy: service.performedBy || "",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.equipmentId ||
      !formData.serviceDate ||
      !formData.description.trim() ||
      formData.cost === ""
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const maintenanceData = {
      ...formData,
      cost: Number(formData.cost),
    };

    try {
      setSaving(true);

      if (service) {
        const response = await updateMaintenance({
          ...maintenanceData,
          id: service.id,
        });

        if (!response.data.succeeded) {
          throw new Error(response.data.message);
        }

        dispatch(
          updateService(response.data.data)
        );

        alert("Maintenance record updated successfully.");
      } else {
        const response = await createMaintenance(maintenanceData);

        if (!response.data.succeeded) {
          throw new Error(response.data.message);
        }

        dispatch(
          addService(response.data.data)
        );

        alert("Maintenance record saved successfully.");
      }

      setFormData({
        equipmentId: "",
        serviceDate: "",
        description: "",
        cost: "",
        performedBy: "",
      });

      if (onClose) onClose();

    } catch (error) {
      console.error("Maintenance save error:", error);
      alert(error.message || "Unable to save maintenance record.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h5 className="mb-3">
        {service ? "Edit Maintenance Record" : "Add Maintenance Record"}
      </h5>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Equipment *</label>

          <select
            name="equipmentId"
            className="form-select"
            value={formData.equipmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Equipment</option>

            {equipment.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Service Date *</label>

          <input
            type="date"
            name="serviceDate"
            className="form-control"
            value={formData.serviceDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description *</label>

          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the maintenance work"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Service Cost *</label>

          <input
            type="number"
            name="cost"
            className="form-control"
            min="0"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Enter service cost"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Performed By</label>

          <input
            type="text"
            name="performedBy"
            className="form-control"
            value={formData.performedBy}
            onChange={handleChange}
            placeholder="Enter worker or technician name"
          />
        </div>

        <button
          type="submit"
          className="btn btn-success me-2"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : service
              ? "Update Record"
              : "Save Record"}
        </button>

        {onClose && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default MaintenanceForm;