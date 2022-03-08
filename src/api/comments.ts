import { request } from './api';

export const getPostComments = async (postId?: number) => {
  const URL = postId ? `/comments?postId=${postId}` : '/comments';
  const response = (await request(URL)).json();

  return response;
};

export const deletePostComment = (commentId: number) => request(`/comments/${commentId}`, { method: 'DELETE' });

export const addPostComment = (comment: UserComment) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
};
