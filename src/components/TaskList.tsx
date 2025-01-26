import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  deleteTask,
  setTasks,
  setTaskToDelete,
} from "../store/slices/tasksSlice";
import { Trash2, X, ListTodo, Clock, CheckCircle2 } from "lucide-react";
import { Column, Task } from "../types";
import TaskColumn from "./TaskColumn";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { getTasks, updateTaskStatus, deleteTask as apiDeleteTask } from "../api"; // Centralized API import

const COLUMNS: Column[] = [
  { id: "pending", title: "Pending", icon: ListTodo, color: "blue" },
  { id: "in-progress", title: "In Progress", icon: Clock, color: "yellow" },
  { id: "done", title: "Done", icon: CheckCircle2, color: "green" },
] as const;

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const taskToDelete = useSelector(
    (state: RootState) => state.tasks.taskToDelete
  );

  const confirmDelete = async () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
      dispatch(setTaskToDelete(null));
      try {
        await apiDeleteTask(taskToDelete); // Using the centralized delete API
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const cancelDelete = () => {
    dispatch(setTaskToDelete(null));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(); // Fetch tasks using the centralized API
        dispatch(setTasks(data));
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    dispatch(
      setTasks(
        tasks.map((task) =>
          task._id === taskId
            ? {
                ...task,
                status: newStatus,
              }
            : task
        )
      )
    );

    try {
      await updateTaskStatus(taskId, newStatus); // Update task status using the centralized API
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((col) => {
            return (
              <TaskColumn
                key={col.id}
                column={col}
                task={tasks?.filter((task) => task.status === col.id)}
              />
            );
          })}
          {taskToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Delete Task
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to delete this task? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <X className="w-4 h-4 inline-block mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="w-4 h-4 inline-block mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </DndContext>
      </div>
    </div>
  );
}
