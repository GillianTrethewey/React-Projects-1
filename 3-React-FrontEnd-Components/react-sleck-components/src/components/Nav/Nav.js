import React, { useState } from 'react';
import './Nav.css';

import logo from './logo.svg';
import starFilled from '../ChatMessage/star_filled.svg';

function Nav(props) {

  // SOLUTION Mystery of the moment: How can I get the star count to show here?
  // (See other activities for solution)

  return (
    <div className="Nav">
      <img src={logo} className="Nav-logo" alt="sleck" />

      <div className="Nav-starredCount">
        {props.starCount}
        <img src={starFilled} alt="Star" />
      </div>
    </div>
  );
}

export default Nav;
