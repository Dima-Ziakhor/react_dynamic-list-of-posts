import { request } from './api';

export async function getUserPosts(userId?: number): Promise<Post[]> {
  const URL = userId ? `/posts?userId=${userId}` : '/posts';
  const response = (await request(URL)).json();

  return response;
}

export async function getPostDetails(postId: number) {
  const URL = `/posts/${postId}`;
  const response = (await request(URL)).json();

  return response;
}
