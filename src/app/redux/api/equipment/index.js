import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all equipment
export function getEquipment() {
  return Promise.resolve(ok(readList(KEYS.equipment)));
}
// Create new equipment
export function createEquipment(equipment) {
  const list = readList(KEYS.equipment);
  const newEquipment = {
    ...equipment,
    id: uid(),
  };
  const saved = writeList(KEYS.equipment, [
    ...list,
    newEquipment,
  ]);
  return saved
    ? Promise.resolve(ok(newEquipment, "Equipment added"))
    : Promise.resolve(bad("Storage full"));
}
// Update equipment
export function updateEquipment(equipment) {
  const list = readList(KEYS.equipment).map((item) =>
    item.id === equipment.id
      ? { ...item, ...equipment }
      : item
  );
  const saved = writeList(KEYS.equipment, list);
  return saved
    ? Promise.resolve(ok(equipment, "Equipment updated"))
    : Promise.resolve(bad("Equipment update failed"));
}
// Remove equipment
export function removeEquipment(id) {
  const list = readList(KEYS.equipment).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.equipment, list);
  return saved
    ? Promise.resolve(ok({ id }, "Equipment removed"))
    : Promise.resolve(bad("Equipment removal failed"));
}