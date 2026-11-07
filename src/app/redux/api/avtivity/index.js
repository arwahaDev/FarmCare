import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all activities
export function getActivities() {
  return Promise.resolve(ok(readList(KEYS.activity)));
}
// Create new activity
export function createActivity(activity) {
  const list = readList(KEYS.activity);
  const newActivity = {
    ...activity,
    id: uid(),
    createdAt: new Date().toISOString(),
  };
  const saved = writeList(KEYS.activity, [
    ...list,
    newActivity,
  ]);
  return saved
    ? Promise.resolve(ok(newActivity, "Activity added"))
    : Promise.resolve(bad("Storage full"));
}
// Remove activity
export function removeActivity(id) {
  const list = readList(KEYS.activity).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.activity, list);
  return saved
    ? Promise.resolve(ok({ id }, "Activity removed"))
    : Promise.resolve(bad("Activity removal failed"));
}
// Clear all activities
export function clearActivities() {
  const saved = writeList(KEYS.activity, []);
  return saved
    ? Promise.resolve(ok([], "Activities cleared"))
    : Promise.resolve(bad("Unable to clear activities"));
}