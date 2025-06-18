import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm.tsx";
import TaskCard from "./components/TaskCard.tsx";
import TaskFilter from "./components/TaskFilter.tsx";
export interface Task {
  id: number;
  title: string;
  desc: string;
  status: "Not Started" | "Ongoing" | "Completed";
  tags: string[];
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<
    "All" | "Not Started" | "Ongoing" | "Completed"
  >("All");
  const addTask = (taskData: Omit<Task, "id">) => {
    const generatedId = Date.now();
    const newTask: Task = {
      ...taskData,
      id: generatedId,
    };
    setTasks([newTask, ...tasks]);
  };
  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };
  const delTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id != id));
  };
  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="AppContainer py-5 mx-auto">
      <h1 className="Heading text-center mb-4">Task Manager</h1>
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskForm onCreateTask={addTask} />
      <div className="TaskList">
        {filteredTasks.length === 0 ? (
          <p className="text-muted text-center mt-3">
            No tasks yet. Add one above!
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateTask={updateTask}
              onDeleteTask={delTask}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default App;
