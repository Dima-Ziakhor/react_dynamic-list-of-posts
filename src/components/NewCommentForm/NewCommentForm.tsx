import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  lastCommentId: number;
  handleSubmit(event: React.SyntheticEvent, comment: UserComment): void;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ lastCommentId, handleSubmit, postId }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userMessage, setUserMessage] = useState<string>('');

  const commentBuilder = (): UserComment => ({
    id: lastCommentId,
    postId,
    name,
    email,
    body: userMessage,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return (
    <form className="NewCommentForm" onSubmit={(event) => handleSubmit(event, commentBuilder())}>
      <div className="form-field">
        <input
          value={name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          value={userMessage}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => setUserMessage(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
