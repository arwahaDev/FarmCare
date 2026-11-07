import { KEYS, readList, writeList, uid } from "../api";
export const activityLogger = (store) => (next) => (action) => {
  const result = next(action);
  if (
    typeof action.type !== "string" ||
    action.type.startsWith("activity/") ||
    !action.type.toLowerCase().endsWith("_success")
  ) {
    return result;
  }
  const actionParts = action.type.toLowerCase().split("/");
  const moduleName = actionParts[0] ?? "";
  const operation = actionParts[1] ?? "";
  const isCreate =
    operation.includes("add") ||
    operation.includes("create") ||
    operation.includes("save");
  const isUpdate = operation.includes("update");
  const isDelete =
    operation.includes("remove") ||
    operation.includes("delete");
  if (!isCreate && !isUpdate && !isDelete) {
    return result;
  }
  try {
    const state = store.getState();
    const currentUser = state.user?.user;
    const log = {
      id: uid(),
      user: currentUser?.username ?? "Unknown User",
      role: currentUser?.role ?? "Unknown Role",
      module: moduleName,
      action: isCreate
        ? "Added"
        : isUpdate
          ? "Updated"
          : "Deleted",
      details: action.payload ?? null,
      timestamp: new Date().toISOString(),
    };
    const existingLogs = readList(KEYS.activity);
    const updatedLogs = [log, ...existingLogs];
    writeList(KEYS.activity, updatedLogs);
    store.dispatch({
      type: "activity/log_success",
      payload: log,
    });
  } catch (error) {
    console.error("Activity Logger Error:", error);
  }
  return result;
};