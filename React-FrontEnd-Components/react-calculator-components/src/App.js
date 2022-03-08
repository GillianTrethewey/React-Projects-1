import React, { useState } from 'react';
import './App.css';

import Calculator from './components/Calculator/Calculator.js';

function App() {
  const [currentNum, setCurrentNum] = useState('???');

  /*
    TODO: Will need to add new methods to implement clicking on numbers and
    other events.
  */

  return (
    <div className="App">
      {/* TODO: Will need to replace the event here,
          to add the number to the state... */}
      <Calculator
        testevent={(number) => console.log('testing', number)}
        number={currentNum} />
    </div>
  );
}

export default App;
