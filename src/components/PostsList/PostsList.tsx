import React, { useState } from 'react';
import './PostsList.scss';

type Props = {
  userPosts: Post[] | null;
  setSelectedPostId(id: number): void;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = ({
  userPosts, setSelectedPostId, selectedPostId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickHandle = (id: number) => {
    if (selectedPostId === id) {
      setSelectedPostId(0);
      setIsOpen(current => !current);
    } else {
      setSelectedPostId(id);
      setIsOpen(true);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
          userPosts && (
            userPosts.map(({ userId, title, id }) => (
              userId && (
                <li className="PostsList__item" key={id}>
                  <div>
                    <b>
                      [User #
                      {userId}
                      ]:
                    </b>
                    {title}
                  </div>

                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => onClickHandle(id)}
                  >
                    {(isOpen && selectedPostId === id) ? 'Close' : 'Open'}
                  </button>
                </li>
              )
            ))
          )
        }
      </ul>
    </div>
  );
};
