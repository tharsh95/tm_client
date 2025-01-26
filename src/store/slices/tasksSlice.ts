// tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';

interface TasksState {
  tasks: Task[];
  taskToDelete: string | null;
  expandedDescriptions: Record<string, boolean>;
  title: string;
  description: string;
  err:string
}

const initialState: TasksState = {
  tasks: [],
  taskToDelete: null,
  expandedDescriptions: {},
  title: '',
  description: '',
  err:''
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t._id !== action.payload);
    },
    setTaskToDelete: (state, action: PayloadAction<string | null>) => {
      state.taskToDelete = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    resetForm: (state) => {
      state.title = '';
      state.description = '';
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    toggleDescription: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.expandedDescriptions[taskId] = !state.expandedDescriptions[taskId];
    },
    setError: (state, action: PayloadAction<string>) => {
      state.err = action.payload;
    }
  },
});

export const { 
  addTask, 
  deleteTask, 
  setTaskToDelete, 
  setTitle, 
  setDescription, 
  resetForm,
  setTasks,
  toggleDescription,
  setError
} = tasksSlice.actions;
export default tasksSlice.reducer;
