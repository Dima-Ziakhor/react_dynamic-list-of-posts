import React, { useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import './PostDetails.scss';

type Props = {
  postDetails: Post | null;
  comments: UserComment[];
  handleDeleteComment(commentId: number): void;
  lastCommentId: number;
  handleSubmit(event: React.SyntheticEvent, comment: UserComment): void;
};

export const PostDetails: React.FC<Props> = ({
  postDetails, comments, handleDeleteComment, lastCommentId, handleSubmit,
}) => {
  const [isHide, setIsHide] = useState(true);

  return (
    <>
      {
        !comments.length && (
          <Loader />
        )
      }

      {
        !!comments.length && postDetails && (
          <div className="PostDetails">
            <h2>
              Post details:
            </h2>

            <section className="PostDetails__post">
              <p>{postDetails.body}</p>
            </section>

            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setIsHide(prev => !prev)}
              >
                {
                  !comments.length && (
                    <>
                      No comments
                    </>
                  )
                }
                {
                  !!comments.length && (
                    <>
                      {!isHide ? 'Hide ' : 'Show '}
                      {comments?.length}
                      {' '}
                      comments
                    </>
                  )
                }
              </button>

              <ul className="PostDetails__list">
                {
                  !isHide && (
                    comments.map(({ id, body }) => (
                      <li key={id} className="PostDetails__list-item">
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => handleDeleteComment(id)}
                        >
                          X
                        </button>
                        <p>{body}</p>
                      </li>
                    ))
                  )
                }
              </ul>
            </section>

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  lastCommentId={lastCommentId}
                  handleSubmit={handleSubmit}
                  postId={postDetails.id}
                />
              </div>
            </section>
          </div>
        )
      }
    </>
  );
};
