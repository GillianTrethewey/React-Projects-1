import React from 'react';
import './Calculator.css';

import Button from '../Button/Button.js';

function Calculator(props) {

  return (
    <div className="Calculator">
      <div className="Calculator-display">
        {props.number}
      </div>
      <div className="Calculator-keypad">
        {/* TODO Will need to add events to every button here... */}
        <Button>9</Button>
        <Button>8</Button>
        <Button>7</Button>
        <Button>6</Button>
        <Button>5</Button>
        <Button>4</Button>
        <Button>3</Button>
        <Button>2</Button>
        <Button>1</Button>
        <Button onClick={() => props.testevent(0)}>0</Button>
        <Button type="red">=</Button>
        <Button type="red">.</Button>
      </div>
      <div className="Calculator-operations">
        <Button type="yellow">÷</Button>
        <Button type="yellow">×</Button>
        <Button type="yellow">-</Button>
        <Button type="yellow">+</Button>
      </div>
    </div>
  );
}

export default Calculator;
