/// <reference types="react-scripts" />

interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  title: string;
  body: string;
}

interface UserComment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: Date,
  updatedAt: Date
}
