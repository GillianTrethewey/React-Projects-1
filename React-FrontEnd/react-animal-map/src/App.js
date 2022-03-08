import React, { useState } from 'react';
import './App.css';

import catImage from './images/cat.png';
import cowImage from './images/cow.png';
import dogImage from './images/dog.png';
import pigImage from './images/pig.png';
import ratImage from './images/rat.png';

const animalTypes = [
  {type: 'cat', imageSrc: catImage},
  {type: 'cow', imageSrc: cowImage},
  {type: 'dog', imageSrc: dogImage},
  {type: 'pig', imageSrc: pigImage},
  {type: 'rat', imageSrc: ratImage},
];

function App() {
  const [name, setName] = useState('');
  const [newAnimalInfo, setNewAnimalInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [limitBy, setLimitBy] = useState(false);
  const [animals, setAnimals] = useState([
    {name: 'whiskers', image: catImage, type: 'cat'},
  ]);

  function onNameChange(ev) {
    setName(ev.target.value);
  }

  function addAnimal() {
    const newAnimal = {
      name: name,
      image: newAnimalInfo.imageSrc,
      type: newAnimalInfo.type,
    };
    setAnimals([
      ...animals,
      newAnimal,
    ]);

    // Another way to do it:
    /*
    const animalsCopy = animals.slice(); // Copies array
    animalsCopy.push(newAnimal); // Add one to the end
    setAnimals(animalsCopy);
    */
  }

  function onLimitByChange(ev) {
    const value = ev.target.value;
    // If the value is "all", then turn off the limitBy feature. Otherwise, set
    // the state to enable it.
    if (value === 'all') {
      setLimitBy(false);
    } else {
      setLimitBy(value);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Petting Zoo Tracker</h1>

        <label>
          Only show:
          <select onChange={onLimitByChange}>
            <option value="all">
              All
            </option>
            {
              animalTypes.map(animalType => (
                <option value={animalType.type} key={animalType.type}>
                  {animalType.type}
                </option>
              ))
            }
          </select>
        </label>

        <label>
          Search:
          <input
            value={searchTerm}
            onChange={ev => setSearchTerm(ev.target.value)}
          />
        </label>

        <img src="https://i.imgur.com/HzafyBAb.jpg" alt="cow" />
      </header>
      <div className="AnimalForm">
        <div className="AnimalForm-animalSelector">
          {
            animalTypes.map(animalType => (
              <label key={animalType.type}>
                <input
                  type="radio"
                  value={animalType.type}
                  checked={newAnimalInfo.type === animalType.type}
                  onChange={() => setNewAnimalInfo(animalType)}
                />
                <img src={animalType.imageSrc} alt="Animal" />
              </label>
            ))
          }
        </div>
        <input
          placeholder="Name your animal"
          value={name}
          onChange={onNameChange}
        />
        <button onClick={addAnimal}>Add Animal</button>
      </div>

      <div className="App-body">
        {
          animals
            .filter(animal => limitBy === false || animal.type === limitBy)
            .filter(animal => animal.name.includes(searchTerm))
            /*.map(animal => (*/
            .map((animal, index) => (
              <div className="Animal" key={animal.type}>
                <img src={animal.image} alt="Animal" />
                <p>{animal.name} the {animal.type}</p>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default App;
