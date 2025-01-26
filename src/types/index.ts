export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  password: string;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done';
}

export interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
  likes: number;
}
export type TaskStatus = 'pending' | 'in-progress' | 'done';


export type Column = {
  id: TaskStatus;
  title: string;
  icon: React.ComponentType ;
  color: string;
};

export interface FeedItems{
  _id?:string;
  url:string;
  createdAt:Date;
  description:string;
  user:string
}