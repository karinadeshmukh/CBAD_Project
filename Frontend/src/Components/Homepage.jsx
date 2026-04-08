import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // Fetch Tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/task/gettask`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.alltask || []);
    } catch (err) {
      if (err.response?.status === 404) {
        setTasks([]);
      } else {
        console.error("Error fetching tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
console.log(token)
    try {
      await axios.post(
        `${BASE_URL}/task/addtask`,
        {
          task: newTask,
          is_completed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task");
    }
  };

  
  const handleToggleSelected = async () => {
    if (!selectedTask) return;

    try {
      await axios.patch(
        `${BASE_URL}/task/taskupdate/${selectedTask._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
      setSelectedTask(null);
    } catch (err) {
      console.error("Error updating task");
    }
  };

  
  const handleDeleteSelected = async () => {
    if (!selectedTask) return;

    try {
      await axios.delete(
        `${BASE_URL}/task/deletetask/${selectedTask._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prev) =>
        prev.filter((t) => t._id !== selectedTask._id)
      );

      setSelectedTask(null);
    } catch (err) {
      console.error("Error deleting task");
    }
  };

  // Delete All
  const handleDeleteAll = async () => {
    try {
      await axios.delete(`${BASE_URL}/deleteall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks([]);
      setSelectedTask(null);
    } catch (err) {
      console.error("Error deleting all tasks");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6">

        <h1 className="text-3xl font-bold text-center mb-6">
          Task Manager
        </h1>

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter a task..."
            className="flex-1 p-3 border rounded-lg"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-5 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Selected Info */}
        {selectedTask && (
          <p className="text-sm text-gray-500 mb-3">
            Selected Task ID: {selectedTask._id}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleToggleSelected}
            disabled={!selectedTask}
            className={`px-4 py-2 rounded ${
              selectedTask
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Toggle Complete
          </button>

          <button
            onClick={handleDeleteSelected}
            disabled={!selectedTask}
            className={`px-4 py-2 rounded ${
              selectedTask
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Delete Selected
          </button>

          {tasks.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 rounded bg-red-700 text-white"
            >
              Delete All
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <p className="text-center text-gray-400">
            No tasks available
          </p>
        )}

        {/* Task List */}
        <div className="space-y-3 mt-4">
          {Array.isArray(tasks) &&
            tasks.map((task) => (
              <div
                key={task._id}
                onClick={() => setSelectedTask(task)}
                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
                  selectedTask?._id === task._id
                    ? "bg-blue-100"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    readOnly
                  />

                  <span
                    className={`${
                      task.is_completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {task.task}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;