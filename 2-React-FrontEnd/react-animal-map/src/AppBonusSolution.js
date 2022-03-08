/*
  NOTE: To try out this version of the app, go to index.js and switch which one
  of these two files is being imported vs commented out.
  (Or, just rename this to App.js... that works too!)
*/
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
  const [newAnimalIndex, setNewAnimalIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalIndex, setEditModalIndex] = useState(null); // BONUS
  const [limitBy, setLimitBy] = useState(false);
  const [animals, setAnimals] = useState([
    {name: 'whiskers', image: catImage, type: 'cat'},
  ]);

  function onNameChange(ev) {
    setName(ev.target.value);
  }

  function addAnimal() {
    // Retrieve the relevant animal info from the animals array using the index
    // of the currently selected animal
    const newAnimalInfo = animalTypes[newAnimalIndex];
    const newAnimal = {
      name: name,
      image: newAnimalInfo.imageSrc,
      type: newAnimalInfo.type,
    };
    setAnimals([
      ...animals,
      newAnimal,
    ]);

    // Clear the input
    setName('');

    // Another way to do it:
    /*
    const animalsCopy = animals.slice(); // Copies array
    animalsCopy.push(newAnimal); // Add one to the end
    setAnimals(animalsCopy);
    */
  }

  function setFilter(ev) {
    const value = ev.target.value;
    if (value === 'all') {
      setLimitBy(false);
    } else {
      setLimitBy(ev.target.value);
    }
  }

  function setEditModalAnimalName(ev) {
    const value = ev.target.value;
    const updatedAnimal = {
      ...animals[editModalIndex],
      name: value,
    };
    setAnimals([
      ...animals.slice(0, editModalIndex),
      updatedAnimal,
      ...animals.slice(editModalIndex + 1),
      // equivalent to:
      //...animals.slice(index, animals.length),
    ])
  }

  function deleteAnimal() {
    const animalsCopy = animals.slice(); // Copies array
    // Remove the one at the given index:
    animalsCopy.splice(editModalIndex, 1);
    setAnimals(animalsCopy);
    setEditModalIndex(null); // hide modal

    // Another way to do it:
    /*
    setAnimals([
      ...animals.slice(0, editModalIndex),
      ...animals.slice(editModalIndex + 1),
    ]);
    */
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Petting Zoo Tracker</h1>

        <label>
          Only show:
          <select onChange={setFilter}>
            <option value="all">
              All
            </option>
            {
              animalTypes.map(animalType => (
                <option key={animalType.type}>
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
            animalTypes.map((animalType, index) => (
              <label key={animalType.type}>
                <input
                  type="radio"
                  value={animalType.type}
                  checked={index === newAnimalIndex}
                  onChange={() => setNewAnimalIndex(index)}
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
                <button onClick={() => setEditModalIndex(index)}>Edit</button>
              </div>
            ))
        }
      </div>

      {
        /* Conditionally show the modal */
        editModalIndex !== null ? (
          <div className="EditModal">
            <div className="EditModal-backdrop" onClick={() => setEditModalIndex(null)}>
            </div>
            <div className="EditModal-contents">
              <div className="EditModal-title">Edit Animal</div>
              <input
                value={animals[editModalIndex].name}
                onChange={setEditModalAnimalName}
              />
              <button onClick={() => setEditModalIndex(null)}>Save</button>
              <button onClick={deleteAnimal}>Delete</button>
            </div>
          </div>
        ) : (
          null
        )
      }
    </div>
  );
}

export default App;
