export const GETEQUIPMENT = "GETEQUIPMENT";
export const ADDEQUIPMENT = "ADDEQUIPMENT";
export const UPDATEEQUIPMENT = "UPDATEEQUIPMENT";
export const REMOVEEQUIPMENT = "REMOVEEQUIPMENT";

export const getEquipment = (equipment) => ({
  type: GETEQUIPMENT,
  payload: equipment,
});

export const addEquipment = (equipment) => ({
  type: ADDEQUIPMENT,
  payload: equipment,
});

export const updateEquipment = (equipment) => ({
  type: UPDATEEQUIPMENT,
  payload: equipment,
});

export const removeEquipment = (id) => ({
  type: REMOVEEQUIPMENT,
  payload: id,
});