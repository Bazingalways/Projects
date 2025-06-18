import React, { useState } from "react";
import { type Task } from "../App";

interface TaskFormProps {
  onCreateTask: (taskData: Omit<Task, "id">) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask }) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [tagsInput, setTagsInput] = useState<string>("");
  const [status, setStatus] = useState<Task["status"]>("Not Started");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const tagsArray = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const newTaskData: Omit<Task, "id"> = {
      title: title,
      desc: desc,
      status: status,
      tags: tagsArray,
    };

    onCreateTask(newTaskData);
    setTitle("");
    setDesc("");
    setTagsInput("");
    setStatus("Not Started");
  };

  const statusOptions: Task["status"][] = [
    "Not Started",
    "Ongoing",
    "Completed",
  ];

  return (
    <div className="mb-4">
      <form
        onSubmit={handleSubmit}
        className="TaskForm p-4 border rounded shadow-sm"
      >
        <input
          type="text"
          placeholder="What's your task?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="What's your task about?"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Tags (separated by commas - eg: academics, health, food)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="form-control mb-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="form-select mb-2"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary w-100">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
