import React, { useState } from 'react';
import './App.css';

import Nav from './components/Nav/Nav.js';
import ChannelSelector from './components/ChannelSelector/ChannelSelector.js';
import ChatArea from './components/ChatArea/ChatArea.js';
import NewMessage from './components/NewMessage/NewMessage.js';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    'Hi how are you',
    'how are you',
    'pls respond',
    'pls',
  ]);

  function onChangeMessage(ev) {
    setMessage(ev.target.value);
  }

  function sendMessage() {
    // Set messages to be the current messages, and the new one
    setMessages([
      ...messages,
      message,
    ]);
    setMessage(''); // Clear out the message box
  }

  const [isStarred, setIsStarred] = useState(false);

  function toggleStar() {
    // Solution: MYSTERY of the MOMENT: How do I reach into the Nav component
    // to update the number of stars?
    // (See other activities for solution)
    setIsStarred(!isStarred);
  }
  const [starCount, setStarCount] = useState(0);
  return (
    <div className="App">
      <Nav />
      <ChannelSelector />
      <ChatArea messages={messages} />
      <NewMessage
        value={message}
        onChangeMessage={onChangeMessage}
        onClickSend={sendMessage}
      />
    </div>
  );
}

export default App;
