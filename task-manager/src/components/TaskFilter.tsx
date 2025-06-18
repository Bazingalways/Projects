import React from "react";
import { type Dispatch, type SetStateAction } from "react"; // Added back Dispatch and SetStateAction

interface TaskFilterProps {
  filter: "All" | "Not Started" | "Ongoing" | "Completed";
  setFilter: Dispatch<
    SetStateAction<"All" | "Not Started" | "Ongoing" | "Completed">
  >;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, setFilter }) => {
  const statuses = ["All", "Not Started", "Ongoing", "Completed"];

  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="btn-group" role="group" aria-label="Task Filter">
        {statuses.map((status) => (
          <button
            key={status}
            className={`btn ${
              filter === status ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() =>
              setFilter(
                status as "All" | "Not Started" | "Ongoing" | "Completed"
              )
            }
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
