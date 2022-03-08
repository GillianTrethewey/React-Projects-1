/*
  This is the first page in the app. It describes the application, and offers a
  big inviting button to get you going.
*/
import React, { useState } from 'react';
import { Button } from 'kc-react-widgets';
import { MdShowChart } from 'react-icons/md';


import './LandingPage.css';
import logo from '../../NavBar/logo.png';
const ENDPOINT = '/api/mongodb/cashflow/';

function LandingPage(props) {

  function createNew() {

    const fetchOptions = {
      method: 'POST',
    };
    fetch(ENDPOINT, fetchOptions)
      .then(response => response.json())
      .then(data => {
        const hex = data.results.ops[0].hex;
        props.history.push('/chart/' + hex);
      });
  }

  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <img src={logo} className="LandingPage-logo" alt="Cash Flow Calc" />
        <h1>Cash Flow Calc</h1>
        <p>Quickly chart your personal or business finances.</p>

        <Button
            type="success"
            size="gigantic"
            depth="towering"
            onClick={createNew}>
          <MdShowChart /> Start!
        </Button>
      </header>
    </div>
  );
}

export default LandingPage;
