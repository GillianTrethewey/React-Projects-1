import React, { useState } from 'react';
import './App.css';


function App() {
  /* Bonus activities */

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  function onCorrectAnswer() {
    alert('Correct!');
    setCorrectAnswers(correctAnswers + 1);
  }

  function onWrongAnswer() {
    alert('Wrong');
    setWrongAnswers(wrongAnswers + 1);
  }

  return (
    <div className="QuestionContainer">
      <h1 className="Header">Game of Thrones Trivia</h1>
      <div className="Guesses">
        Correct guesses: {correctAnswers}<br />
        Wrong guesses: {wrongAnswers}
      </div>

      <div className="Question">
        <p className="Question-prompt">How did Daenerys Targaryen eventually hatch her dragon eggs?</p>
        <img className="Question-image" src="https://i.imgur.com/NPTQ1Hv.jpg" alt="dragon eggies" />

        <div className="Question-options">
          <button onClick={() => alert('Wrong')}>1. In a lightning storm</button>
          <button onClick={onCorrectAnswer}>2. In a fire</button>
          <button onClick={onWrongAnswer}>3. In an omelet</button>
          <button onClick={onWrongAnswer}>4. In a frozen cave</button>
        </div>

        <p className="Question-explanation">At the end of Season 1, Daenerys Targaryen emerges emerged from the ashes of the fire she had placed her eggs in, holding three newly hatched dragons.</p>
      </div>

      <div className="Question">
        <p className="Question-prompt">The phrase 'Valar Morghulis' or 'all men must die' is usually responded with:</p>
        <img className="Question-image" src="https://i.imgur.com/zoTroXq.jpg" alt="spooky man" />

        <div className="Question-options">
          <button onClick={onCorrectAnswer}>1. Valar Dohaeris or 'all men must serve'</button>
          <button onClick={onWrongAnswer}>2. Valar Rohnas or 'all men must live'</button>
          <button onClick={onWrongAnswer}>3. Valar GoGo or 'all men must dance'</button>
          <button onClick={onWrongAnswer}>4. Valar Kilmer or 'all men must act'</button>
        </div>

        <p className="Question-explanation">The Season 2 finale was named "Valar Morghulis" while the Season 3 premiere was named "Valar Dohaeris." In 2014, the Brewery Ommegang created a beer called "Valar Morghulis," with each cork fire-branded with the response.</p>
      </div>

      <div className="Question">
        <p className="Question-prompt">Besides dragonglass, what is the only other substance capable of defeating White Walkers?</p>
        <img className="Question-image" src="https://i.imgur.com/m0u5VrG.jpg" alt="frosty boye"/>

        <div className="Question-options">
          <button onClick={onWrongAnswer}>1. Weirwood</button>
          <button onClick={onWrongAnswer}>2. Wildfire</button>
          <button onClick={onCorrectAnswer}>3. Valyrian steel</button>
          <button onClick={onWrongAnswer}>4. Snowballs</button>
        </div>

        <p className="Question-explanation">Valyrian Steel is not only exceptionally sharp, strong and free of maintenance, but is also capable of taking down an immortal White Walker. The metal is easily identified by its distinctive rippled pattern.</p>
      </div>

      <div className="Question">
        <p className="Question-prompt">Which Stark family direwolf received the penalty for Joffrey being bitten?</p>
        <img className="Question-image" src="https://i.imgur.com/QUkikLL.jpg" alt="doggo" />

        <div className="Question-options">
          <button onClick={onWrongAnswer}>1. Ghost</button>
          <button onClick={onCorrectAnswer}>2. Lady</button>
          <button onClick={onWrongAnswer}>3. Nymeria</button>
          <button onClick={onWrongAnswer}>4. Summer</button>
        </div>

        <p className="Question-explanation">After the direwolf Nymeria flees into the woods following a defensive attack against Prince Joffrey, Queen Cersei Lannister took her wrath out on the sister wolf, Lady.</p>
      </div>

      <div className="Question">
        <p className="Question-prompt">What was the name of Ned Stark's greatsword?</p>
        <img className="Question-image" src="https://i.imgur.com/opChkVP.jpg" alt="stay a-head, ned!" />

        <div className="Question-options">
          <button onClick={onCorrectAnswer}>1. Ice</button>
          <button onClick={onWrongAnswer}>2. Oathkeeper</button>
          <button onClick={onWrongAnswer}>3. Widow's Wail</button>
          <button onClick={onWrongAnswer}>4. Northguard</button>
        </div>

        <p className="Question-explanation">Ice was the official sword of the Lord of Winterfell, forged from Valyrian steel and handed down over the ages. After being used to behead Ned Stark at the end of Season 1, it was subsequently melted down to forge two new swords – the Oathkeeper and Widow's Wail.</p>
      </div>
    </div>
  );
}

export default App;
