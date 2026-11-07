import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all workers
export function getWorkers() {
  return Promise.resolve(ok(readList(KEYS.workers)));
}
// Create new worker
export function createWorker(worker) {
  const list = readList(KEYS.workers);
  const newWorker = {
    ...worker,
    id: uid(),
  };
  const saved = writeList(KEYS.workers, [
    ...list,
    newWorker,
  ]);
  return saved
    ? Promise.resolve(ok(newWorker, "Worker added"))
    : Promise.resolve(bad("Storage full"));
}
// Update worker
export function updateWorker(worker) {
  const list = readList(KEYS.workers).map((item) =>
    item.id === worker.id
      ? { ...item, ...worker }
      : item
  );
  const saved = writeList(KEYS.workers, list);
  return saved
    ? Promise.resolve(ok(worker, "Worker updated"))
    : Promise.resolve(bad("Worker update failed"));
}
// Remove worker
export function removeWorker(id) {
  const list = readList(KEYS.workers).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.workers, list);
  return saved
    ? Promise.resolve(ok({ id }, "Worker removed"))
    : Promise.resolve(bad("Worker removal failed"));
}