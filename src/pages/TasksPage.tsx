import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function TasksPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Tasks</h2>
        <TaskList />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Task</h2>
        <TaskForm />
      </div>
    </div>
  );
}