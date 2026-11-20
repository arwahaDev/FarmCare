import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  UPDATETASK,
  REMOVETASK,
} from "../../app/redux/actions/tasks";

function TaskList() {
  const dispatch = useDispatch();

  const tasks = useSelector(
    (state) => state.tasks?.tasks ?? []
  );

  // Get logged-in user's role
  const session = JSON.parse(
    localStorage.getItem("agri_session") || "null"
  );

  const userRole = (
    session?.user?.userType ||
    session?.userType ||
    session?.role ||
    ""
  ).toLowerCase();

  const isAdmin = userRole === "admin";

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Remove invalid task entries
  const validTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task && typeof task === "object")
    : [];

  // Update Task Status
  const toggleTask = (task) => {
    dispatch(
      UPDATETASK(task.id, {
        ...task,
        completed: !task.completed,
      })
    );
  };

  // Start Editing
  const handleEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title || "");
  };

  // Save Edited Task
  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      alert("Task title cannot be empty.");
      return;
    }

    dispatch(
      UPDATETASK(editingTask.id, {
        ...editingTask,
        title: editTitle.trim(),
      })
    );

    setEditingTask(null);
    setEditTitle("");
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
  };

  // Delete Task - Admin Only
  const handleDelete = (id) => {
    if (!isAdmin) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      dispatch(REMOVETASK(id));
    }
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

            {editingTask?.id === task.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Enter task title"
                />

                <button type="button" onClick={handleSaveEdit}>
                  Save
                </button>

                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
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
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;