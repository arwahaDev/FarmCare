// Workers Action Types
export const GETWORKERS = "GETWORKERS";
export const ADDWORKER = "ADDWORKER";
export const UPDATEWORKER = "UPDATEWORKER";
export const REMOVEWORKER = "REMOVEWORKER";

// Get All Workers
export const getWorkers = (workers) => ({
  type: GETWORKERS,
  payload: workers,
});

// Add Worker
export const addWorker = (worker) => ({
  type: ADDWORKER,
  payload: worker,
});

// Update Worker
export const updateWorker = (worker) => ({
  type: UPDATEWORKER,
  payload: worker,
});

// Remove Worker
export const removeWorker = (id) => ({
  type: REMOVEWORKER,
  payload: id,
});