import React, { useState } from 'react';
import './ChatMessage.css';

import avatar from './placeholder.svg';
import starEmpty from './star_empty.svg';
import starFilled from './star_filled.svg';

function ChatMessage(props) {
  // Start out unstarred
  const [isStarred, setIsStarred] = useState(false);

  function toggleStar() {
    // Solution: MYSTERY of the MOMENT: How do I reach into the Nav component
    // to update the number of stars?
    // (See other activities for solution)
    setIsStarred(!isStarred);
  }

  let starIcon = starEmpty;
  if (isStarred) {
    starIcon = starFilled;
  }

  return (
    <div className="ChatMessage">
      <img className="ChatMessage-avatar" src={avatar} alt="avatar" />
      <div className="ChatMessage-text">
        <p>{props.text}</p>
      </div>
      <img onClick={toggleStar} className="ChatMessage-star" src={starIcon} alt="star" />
    </div>
  );
}

export default ChatMessage;
