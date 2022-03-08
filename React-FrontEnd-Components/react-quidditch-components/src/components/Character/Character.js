import React from 'react';
import './Character.css';

function Character(props) {
  if (!props.info) {
    return (
      <em>None selected</em>
    );
  }
  return (
    <div className="Character">
      <h3>{props.info.name}</h3>
      <h4>{props.info.house}</h4>
      <button onClick={props.onButtonClick}>
        {props.buttonText || 'Choose'}
      </button>
    </div>
  );
}

export default Character;

