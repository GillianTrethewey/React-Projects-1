import React from 'react';

import './BoxSelector.css';

function BoxSelector(props) {

  function squareGotClicked(choice) {
    // Only trigger an "onSelectionChange" event if its different than what is
    // currently selected
    if (choice !== props.selectedValue) {
      props.onSelectionChange(choice);
    }
  }

  // In this render function, we loop through using .map all the choices
  // presented to this component. Each "choice" is a div with the class
  // "BoxSelector-square". The ? : (ternary operator / "if statement") is
  // used to selectively give the box that is "checked" or selected a
  // different set of classes, specifically the class
  // "BoxSelector--selected", which causes the "filled in look" and the
  // animation of selecting it.
  return (
    <div className="BoxSelector">

      {
        props.choices.map(choice => (
          <div
            className={
              choice === props.selectedValue ?
                "BoxSelector-square BoxSelector--selected" :
                "BoxSelector-square"
            }
            title={choice}
            key={choice}
            onClick={() => squareGotClicked(choice)}
          >
          </div>
        ))
      }
      <div className="BoxSelector-caption">
        {props.selectedValue}
      </div>
    </div>
  );
}

export default BoxSelector;
