import React from 'react';
import './Button.css';

function Button(props) {
  let className = 'Button';

  if (props.type === 'red') {
    className = 'Button Button--red';
  }
  if (props.type === 'green') {
    className = 'Button Button--green';
  }
  if (props.type === 'blue') {
    className = 'Button Button--blue';
  }
  if (props.type === 'yellow') {
    className = 'Button Button--yellow';
  }

  return (
    <div className={className} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default Button;
