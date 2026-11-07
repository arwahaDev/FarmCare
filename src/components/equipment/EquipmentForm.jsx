import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addEquipment,
  updateEquipment,
} from "../../app/redux/actions/equipment";

function EquipmentForm({ editingEquipment, onCancelEdit }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [type, setType] = useState("Tractor");
  const [model, setModel] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [lastServiceDate, setLastServiceDate] = useState("");
  const [nextServiceDate, setNextServiceDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingEquipment) {
      setName(editingEquipment.name || "");
      setType(editingEquipment.type || "Tractor");
      setModel(editingEquipment.model || "");
      setPurchaseDate(editingEquipment.purchaseDate || "");
      setLastServiceDate(editingEquipment.lastServiceDate || "");
      setNextServiceDate(editingEquipment.nextServiceDate || "");
      setStatus(editingEquipment.status || "Active");
    }
  }, [editingEquipment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Equipment name is required.");
      return;
    }

    if (!model.trim()) {
      setError("Model is required.");
      return;
    }

    if (!purchaseDate) {
      setError("Please select purchase date.");
      return;
    }

    const equipmentData = {
      ...(editingEquipment || {}),
      name: name.trim(),
      type,
      model: model.trim(),
      purchaseDate,
      lastServiceDate,
      nextServiceDate,
      status,
    };

    if (editingEquipment) {
      dispatch(updateEquipment(equipmentData));
    } else {
      dispatch(
        addEquipment({
          ...equipmentData,
          id: Date.now(),
        })
      );
    }

    handleReset();
  };

  const handleReset = () => {
    setName("");
    setType("Tractor");
    setModel("");
    setPurchaseDate("");
    setLastServiceDate("");
    setNextServiceDate("");
    setStatus("Active");
    setError("");

    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form className="equipment-form" onSubmit={handleSubmit}>
      <h3>
        {editingEquipment ? "Update Equipment" : "Add New Equipment"}
      </h3>

      <label>Equipment Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter equipment name"
        required
      />

      <label>Equipment Type</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Tractor">Tractor</option>
        <option value="Water Pump">Water Pump</option>
        <option value="Sprayer">Sprayer</option>
        <option value="Harvester">Harvester</option>
        <option value="Other">Other</option>
      </select>

      <label>Model</label>
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Enter model"
        required
      />

      <label>Purchase Date</label>
      <input
        type="date"
        value={purchaseDate}
        onChange={(e) => setPurchaseDate(e.target.value)}
        required
      />

      <label>Last Service Date</label>
      <input
        type="date"
        value={lastServiceDate}
        onChange={(e) => setLastServiceDate(e.target.value)}
      />

      <label>Next Service Date</label>
      <input
        type="date"
        value={nextServiceDate}
        onChange={(e) => setNextServiceDate(e.target.value)}
      />

      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Active">Active</option>
        <option value="Under Repair">Under Repair</option>
        <option value="Idle">Idle</option>
      </select>

      {error && <p className="text-danger">{error}</p>}

      <button type="submit">
        {editingEquipment ? "Update Equipment" : "Add Equipment"}
      </button>

      {editingEquipment && (
        <button type="button" onClick={handleReset}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default EquipmentForm;