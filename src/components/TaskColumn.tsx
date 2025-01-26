import { Task, Column as ColumnType } from "../types";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
type ColumnProps = {
  column: ColumnType;
  task: Task[];
};

const TaskColumn = ({ column, task }: ColumnProps) => {

const {setNodeRef} = useDroppable ({
    id: column.id,
    });
  const { icon: Icon, color } = column;
  return (
    <div className="flex w-1/3 flex-col rounded-lg bg-gray-300 shadow-sm p-4">
      <div className={`flex items-center gap-2 text-${color}-600`}>
        <Icon  />
      <h2 className=" font-semibold ">{column.title}</h2>
      <h3>{task.length}</h3>
      </div>
      <div className={`border-t border-${color}-400 my-4`}></div>
      <div ref={setNodeRef}className="flex flex-1 flex-col gap-4">
        {task?.map((task) => {
          return <TaskCard key={task._id} task={task} />;
        })}
      </div>
    </div>
  );
};

export default TaskColumn;
