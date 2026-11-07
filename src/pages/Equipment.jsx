import { useState } from "react";

import EquipmentForm from "../components/equipment/EquipmentForm";
import EquipmentTable from "../components/equipment/EquipmentTable";

function Equipment() {
  const [editingEquipment, setEditingEquipment] = useState(null);

  const handleEdit = (equipment) => {
    setEditingEquipment(equipment);
  };

  const handleCancelEdit = () => {
    setEditingEquipment(null);
  };

  return (
    <div className="container-fluid equipment-page">

      <div className="mb-4">
        <h2>Equipment Management</h2>
        <p>
          Manage farm machinery, equipment details and service dates.
        </p>
      </div>

      <div className="card p-3 mb-4">
        <EquipmentForm
          editingEquipment={editingEquipment}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      <div className="card p-3 mb-4">
        <EquipmentTable onEdit={handleEdit} />
      </div>

    </div>
  );
}

export default Equipment;