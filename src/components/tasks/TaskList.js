import { useDispatch, useSelector } from "react-redux";

import {
  UPDATETASK,
  REMOVETASK,
} from "../../app/redux/actions/tasks";

function TaskList() {
  const dispatch = useDispatch();

  const tasks = useSelector(
    (state) => state.tasks?.tasks ?? []
  );

  // Remove invalid task entries
  const validTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task && typeof task === "object")
    : [];

  // Update Task
  const toggleTask = (task) => {
  console.log("Updating task:", task);

  dispatch(
    UPDATETASK(task.id, {
      ...task,
      completed: !task.completed,
    })
  );
};

const handleDelete = (id) => {
  console.log("Deleting task ID:", id);

  dispatch(REMOVETASK(id));
};
   
      
  return (
    <div className="task-list">
      <h2>Task List</h2>

      {validTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        validTasks.map((task) => (
          <div className="task-item" key={task.id}>
            <input
              type="checkbox"
              checked={Boolean(task.completed)}
              onChange={() => toggleTask(task)}
            />

            <span
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {task.title || "Untitled Task"}
            </span>

            <p>
              Due Date: {task.dueDate || "Not set"}
            </p>

            <p>Priority: {task.priority || "Normal"}</p>

            <button
              type="button"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;