import React from 'react';
import './ChatArea.css';

import ChatMessage from "../ChatMessage/ChatMessage.js";

function ChatArea(props) {

  return (
    <div className="ChatArea">
      {
        props.messages.map((text, index) => (
          <ChatMessage
            key={index}
            text={text} />
        ))
      }
    </div>
  );
}

export default ChatArea;
