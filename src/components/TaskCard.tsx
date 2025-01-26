import { useDispatch, useSelector } from "react-redux";
import { Task } from "../types";
import { useDraggable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import { setTaskToDelete, toggleDescription } from "../store/slices/tasksSlice";
import { RootState } from "../store";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const dispatch = useDispatch();
  const expandedDescriptions = useSelector(
    (state: RootState) => state.tasks.expandedDescriptions
  );
  const isExpanded = task._id ? expandedDescriptions[task._id] || false : false;

  const { attributes, setNodeRef, listeners, transform } = useDraggable({
    id: task._id ? task._id.toString() : "",  // Ensure _id is a valid string
  });

  const handleDeleteClick = (taskId: string) => {
    dispatch(setTaskToDelete(taskId));
  };

  const handleDescriptionClick = () => {
    if (task._id) {
      dispatch(toggleDescription(task._id));
    }
  };

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      className="bg-white rounded-lg shadow p-4 space-y-4 mt-4 border border-gray-200 hover:cursor-grab"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <div className="flex justify-between">
        <h3 className="font-medium text-black">{task.title}</h3>
        <button
          onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when interacting with the button
          onClick={() => task._id && handleDeleteClick(task._id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <p
        className="mt-2 text-sm text-neutral-900 cursor-pointer"
        onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when interacting with the button
        onClick={handleDescriptionClick} // Toggle expand/collapse on click
      >
        {isExpanded
          ? task.description
          : `${task.description.slice(0, 20)}${
              task.description.length > 50 ? "..." : ""
            }`}{" "}
        {/* Truncate with ellipsis */}
      </p>
    </div>
  );
};

export default TaskCard;
