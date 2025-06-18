import React, { useState } from "react";
import { type Task } from "../App";

interface TaskCardProps {
  task: Task;
  onUpdateTask: (id: number, updatedTask: Partial<Task>) => void;
  onDeleteTask: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDeleteTask,
  onUpdateTask,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.title);
  const [editedDesc, setEditedDesc] = useState<string>(task.desc);
  const [editedTagsInput, setEditedTagsInput] = useState<string>(
    task.tags.join(", ")
  );
  const [editedStatus, setEditedStatus] = useState<Task["status"]>(task.status);

  const handleUpdate = () => {
    if (!editedTitle.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    const tagsArray = editedTagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const updatedTaskData: Partial<Task> = {
      title: editedTitle,
      desc: editedDesc,
      tags: tagsArray,
      status: editedStatus,
    };

    onUpdateTask(task.id, updatedTaskData);
    setIsEditing(false);
  };

  const statusOptions: Task["status"][] = [
    "Not Started",
    "Ongoing",
    "Completed",
  ];

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        {isEditing ? (
          <div className="EditMode">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="form-control mb-2"
            />
            <textarea
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Tags (separated by commas)"
              value={editedTagsInput}
              onChange={(e) => setEditedTagsInput(e.target.value)}
              className="form-control mb-2"
            />
            <select
              value={editedStatus}
              onChange={(e) =>
                setEditedStatus(e.target.value as Task["status"])
              }
              className="form-select mb-3"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div className="d-flex justify-content-end">
              <button
                onClick={handleUpdate}
                className="btn btn-success btn-sm me-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="ViewMode">
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.desc}</p>
            <p className="card-text mb-1">
              Status:{" "}
              <span
                className={`badge ${
                  task.status === "Completed"
                    ? "badge text-bg-success"
                    : task.status === "Ongoing"
                    ? "badge text-bg-warning"
                    : "badge text-bg-danger"
                }`}
              >
                {task.status}
              </span>
            </p>

            {task.tags && task.tags.length > 0 && (
              <p className="card-text">
                Tags:{" "}
                {task.tags.map((tag, index) => (
                  <span key={index} className="badge badge-custom-purple me-1">
                    {tag}
                  </span>
                ))}
              </p>
            )}

            <div className="d-flex justify-content-end">
              <button
                onClick={() => onDeleteTask(task.id)}
                className="btn btn-danger btn-sm me-2"
              >
                Delete
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-info btn-sm"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
