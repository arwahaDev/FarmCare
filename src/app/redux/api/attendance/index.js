import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all attendance records
export function getAttendance() {
  return Promise.resolve(ok(readList(KEYS.attendance)));
}
// Create attendance record
export function createAttendance(record) {
  const list = readList(KEYS.attendance);
  const newRecord = {
    ...record,
    id: uid(),
  };
  const saved = writeList(KEYS.attendance, [
    ...list,
    newRecord,
  ]);
  return saved
    ? Promise.resolve(ok(newRecord, "Attendance recorded"))
    : Promise.resolve(bad("Storage full"));
}
// Update attendance record
export function updateAttendance(record) {
  const list = readList(KEYS.attendance).map((item) =>
    item.id === record.id
      ? { ...item, ...record }
      : item
  );
  const saved = writeList(KEYS.attendance, list);
  return saved
    ? Promise.resolve(ok(record, "Attendance updated"))
    : Promise.resolve(bad("Attendance update failed"));
}
// Remove attendance record
export function removeAttendance(id) {
  const list = readList(KEYS.attendance).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.attendance, list);
  return saved
    ? Promise.resolve(ok({ id }, "Attendance removed"))
    : Promise.resolve(bad("Attendance removal failed"));
}