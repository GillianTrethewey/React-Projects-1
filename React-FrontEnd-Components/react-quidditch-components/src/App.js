/*
  This solution has the "component" refactor.
  
  NOTE: It also uses alternate techniques for modifying state, by instead
  copying the arrays and then performing the manipulation. The alternate
  techniques are provided for the sake of variety.  All the state modifying
  functions included here can be swapped out with their counterparts in the
  other activity with no change in the behavior. Either method is considered
  "good programming" --- it's largely a matter of taste which one you prefer!
*/

import React, { useState } from 'react';
import './App.css';

import Nav from './components/Nav/Nav.js';
import Character from './components/Character/Character.js';

// Pull in player data from the players JSON file
import players from './players.json';

// Uses filter to narrow down array into 4 individual player arrays, one for
// each of the 4 Quidditch positions
const chaserPlayers = players.filter(p => p.position === 'Chaser');
const beaterPlayers = players.filter(p => p.position === 'Beater');
const keeperPlayers = players.filter(p => p.position === 'Keeper');
const seekerPlayers = players.filter(p => p.position === 'Seeker');

// Define our App
function App () {

  // Define "pool" of available characters
  const [availableChasers, setAvailableChasers] = useState(chaserPlayers);
  const [availableBeaters, setAvailableBeaters] = useState(beaterPlayers);

  const availableKeepers = keeperPlayers;
  const availableSeekers = seekerPlayers;

  // Define which ones we'll be using for this team
  const [chosenChasers, setChosenChasers] = useState([]);
  const [chosenBeaters, setChosenBeaters] = useState([]);

  // There is only one keeper and one seeker per team
  const [chosenKeeper, setChosenKeeper] = useState(null);
  const [chosenSeeker, setChosenSeeker] = useState(null);

  function onChooseKeeper(index) {
    // When they click on a "chosen" keeper, get the keeper that we want
    // to use with the index provided, then do a setState
    const desiredKeeper = availableKeepers[index];
    setChosenKeeper(desiredKeeper);
  }

  function removeKeeper() {
    setChosenKeeper(null); // Clear the chosen keeper
  }

  function onChooseSeeker(index) {
    setChosenSeeker(availableSeekers[index]);
  }

  function removeSeeker() {
    setChosenSeeker(null); // Clear the chosen seeker
  }

  function onChooseChaser(index) {
    // Duplicate the two arrays we have to modify
    const chosenChasersCopy = chosenChasers.slice();
    const availableChasersCopy = availableChasers.slice();

    // Retrieve the character in question
    const character = availableChasersCopy[index];

    chosenChasersCopy.push(character); // Add to the chosen

    // Remove element from array based on index
    availableChasersCopy.splice(index, 1);

    // Update the chosen chasers and the available chasers arrays
    setChosenChasers(chosenChasersCopy);
    setAvailableChasers(availableChasersCopy);
  }

  function removeChaser(index) {
    // Duplicate the two arrays we have to modify
    const chosenChasersCopy = chosenChasers.slice();
    const availableChasersCopy = availableChasers.slice();

    // Same as "add", but in reverse: Retrieve, add, then remove
    const character = chosenChasersCopy[index];
    availableChasersCopy.push(character);
    chosenChasersCopy.splice(index, 1); // remove based on index

    // Update the chosen chasers and the available chasers arrays
    setChosenChasers(chosenChasersCopy);
    setAvailableChasers(availableChasersCopy);
  }


  function onChooseBeater(index) {
    // Duplicate the two arrays we have to modify
    const chosenBeatersCopy = chosenBeaters.slice();
    const availableBeatersCopy = availableBeaters.slice();

    // Retrieve the character in question
    const character = availableBeatersCopy[index];
    chosenBeatersCopy.push(character); // Add to the chosen
    availableBeatersCopy.splice(index, 1); // remove based on index

    // Update arrays with the new version
    setChosenBeaters(chosenBeatersCopy);
    setAvailableBeaters(availableBeatersCopy);
  }

  function removeBeater(index) {
    // Duplicate the two arrays we have to modify
    const chosenBeatersCopy = chosenBeaters.slice();
    const availableBeatersCopy = availableBeaters.slice();

    // Same as "add", but in reverse: Retrieve, add, then remove
    const character = chosenBeatersCopy[index];
    availableBeatersCopy.push(character);
    chosenBeatersCopy.splice(index, 1);

    setChosenBeaters(chosenBeatersCopy);
    setAvailableBeaters(availableBeatersCopy);
  }

  return (
    <div className="App">
      <Nav />
      <div className="TeamManager">
        <div className="TeamManager-position">
          <h2>Starting Keeper</h2>
          <Character
            info={chosenKeeper}
            onButtonClick={removeKeeper}
            buttonText={"Remove"} />
        </div>

        <div className="TeamManager-position">
          <h2>Roster (Keepers)</h2>
          {
            availableKeepers.map((character, index) => (
              <Character
                key={index}
                info={character}
                onButtonClick={() => onChooseKeeper(index)} />
            ))
          }
        </div>

        <div className="TeamManager-position">
          <h2>Starting Seeker</h2>
          <Character
            info={chosenSeeker}
            onButtonClick={removeSeeker}
            buttonText={"Remove"} />
        </div>

        <div className="TeamManager-position">
          <h2>Roster (Seekers)</h2>
          {
            availableSeekers.map((character, index) => (
              <Character
                key={index}
                info={character}
                onButtonClick={() => onChooseSeeker(index)} />
            ))
          }
        </div>

        <div className="TeamManager-position">
          <h2>Starting Chasers</h2>
          {
            chosenChasers.map((character, index) => (
              <Character
                key={index}
                info={character}
                onButtonClick={() => removeChaser(index)}
                buttonText={"Remove"} />
            ))
          }
        </div>

        <div className="TeamManager-position">
          <h2>Roster (Chasers)</h2>
          {
            availableChasers.map((character, index) => (
              <Character
                key={index}
                info={character}
                onButtonClick={() => onChooseChaser(index)} />
            ))
          }
        </div>

        <div className="TeamManager-position">
          <h2>Starting Beaters</h2>
          {
            chosenBeaters.map((character, index) => (
              <Character
                key={index}
                info={character}
                onButtonClick={() => removeBeater(index)}
                buttonText={"Remove"} />
            ))
          }
        </div>

        <div className="TeamManager-position">
          <h2>Roster (Beaters)</h2>
          {
            availableBeaters.map((character, index) => (
              <Character
                key={index}
                info={character}
                onButtonClick={() => onChooseBeater(index)} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
