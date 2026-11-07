import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all maintenance records
export function getMaintenance() {
  return Promise.resolve(ok(readList(KEYS.maintenance)));
}
// Create maintenance record
export function createMaintenance(record) {
  const list = readList(KEYS.maintenance);
  const newRecord = {
    ...record,
    id: uid(),
  };
  const saved = writeList(KEYS.maintenance, [
    ...list,
    newRecord,
  ]);
  return saved
    ? Promise.resolve(ok(newRecord, "Maintenance record added"))
    : Promise.resolve(bad("Storage full"));
}
// Update maintenance record
export function updateMaintenance(record) {
  const list = readList(KEYS.maintenance).map((item) =>
    item.id === record.id
      ? { ...item, ...record }
      : item
  );
  const saved = writeList(KEYS.maintenance, list);
  return saved
    ? Promise.resolve(ok(record, "Maintenance record updated"))
    : Promise.resolve(bad("Maintenance update failed"));
}
// Remove maintenance record
export function removeMaintenance(id) {
  const list = readList(KEYS.maintenance).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.maintenance, list);
  return saved
    ? Promise.resolve(ok({ id }, "Maintenance record removed"))
    : Promise.resolve(bad("Maintenance removal failed"));
}