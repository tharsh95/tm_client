import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, setTitle, setDescription, resetForm, setError } from '../store/slices/tasksSlice';
import { RootState } from '../store';
import { Plus } from 'lucide-react';
import { createTask } from '../api'; // Import centralized API function
import { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function TaskForm() {
  const dispatch = useDispatch();
  const { title, description, err } = useSelector((state: RootState) => state.tasks);
  const { token } = useSelector((state: RootState) => state.auth);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      _id:uuidv4(),
      title,
      description,
      status: 'pending' as const, // New tasks always start in pending
    };

    try {
       await createTask(newTask,token); // Using centralized API function
      dispatch(addTask(newTask));
      dispatch(resetForm());
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        dispatch(setError(error.response?.data || 'Error creating task'));
  
    }
  };
}

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      {err && <p className="text-red-500 text-sm">{err}</p>}

      <button
        type="submit"
        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Task
      </button>
    </form>
  );
}
