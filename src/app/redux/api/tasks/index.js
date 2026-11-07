import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";

// Get all tasks
export function getTasks() {
  return Promise.resolve(ok(readList(KEYS.tasks)));
}

// Create task
export function createTask(task) {
  const list = readList(KEYS.tasks);

  const newTask = {
    ...task,
    id: uid(),
    completed: Boolean(task.completed),
  };

  const saved = writeList(KEYS.tasks, [...list, newTask]);

  return Promise.resolve(
    saved
      ? ok(newTask, "Task added successfully")
      : bad("Task could not be saved")
  );
}

// Update task
export function updateTask(task) {
  const list = readList(KEYS.tasks);

  const updatedList = list.map((item) =>
    item && String(item.id) === String(task.id)
      ? { ...item, ...task }
      : item
  );

  const saved = writeList(KEYS.tasks, updatedList);

  return Promise.resolve(
    saved
      ? ok(task, "Task updated successfully")
      : bad("Task update failed")
  );
}

// Delete task
export function removeTask(id) {
  const list = readList(KEYS.tasks);

  const updatedList = list.filter(
    (item) => item && String(item.id) !== String(id)
  );

  const saved = writeList(KEYS.tasks, updatedList);

  return Promise.resolve(
    saved
      ? ok({ id }, "Task deleted successfully")
      : bad("Task deletion failed")
  );
}