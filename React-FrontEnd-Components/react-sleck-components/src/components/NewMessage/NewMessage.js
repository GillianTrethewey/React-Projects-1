import React from 'react';
import './NewMessage.css';

import Button from '../Button/Button.js';


function NewMessage(props) {
  return (
    <div className="NewMessage">
      <input value={props.value} onChange={props.onChangeMessage} placeholder="Type your message" />
      <Button onClick={props.onClickSend}>Send</Button>
    </div>
  );
}

export default NewMessage;
