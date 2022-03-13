/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getPostDetails } from './api/posts';
import { getPostComments, deletePostComment, addPostComment } from './api/comments';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [userPosts, setUserPost] = useState<Post[] | null>(null);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [lastCommentId, setLastCommentId] = useState<number>(0);

  const handleDeleteComment = (commentId: number) => {
    deletePostComment(commentId);
    setComments(current => current?.filter(comment => comment.id !== commentId) || null);
  };

  const handleSubmit = (event: React.SyntheticEvent, comment: UserComment) => {
    event.preventDefault();
    getPostComments().then(
      res => setLastCommentId(
        [...res].sort((a: UserComment, b: UserComment) => a.id - b.id)[res.length - 1].id,
      ),
    );
    setComments(prev => ([...prev, comment]));
    addPostComment(comment);
  };

  useEffect(() => {
    getUserPosts(selectedUserId).then(res => setUserPost(res));
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPostId) {
      getPostDetails(selectedPostId).then(res => setPostDetails(res));
      getPostComments(selectedPostId).then(res => setComments(res));
    } else {
      setComments([]);
    }
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={(event) => setSelectedUserId(Number(event.target.value))}>
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userPosts={userPosts}
            setSelectedPostId={setSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        {
          !!selectedPostId && (
            <div className="App__content">
              <PostDetails
                postDetails={postDetails}
                comments={comments}
                handleDeleteComment={handleDeleteComment}
                lastCommentId={lastCommentId}
                handleSubmit={handleSubmit}
              />
            </div>
          )
        }
      </main>
    </div>
  );
};

export default App;
