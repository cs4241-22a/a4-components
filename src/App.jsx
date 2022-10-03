
import React, { useState } from "react";
import {default as NewTable} from "./NewTable";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {
  const [entries, setEntries] = useState([]);

  const click = event => {
    const value = document.querySelector('#yourname').value;
    fetch( '/add', { 
      method:'POST',
      body: JSON.stringify({ name:value }),
      headers: { 'Content-Type': 'application/json' }
    })

    fetch('/read',{
      method: 'GET'
    })
    .then( function (response ) {
      return response.json();
    })
    .then( function( response )  {
      setEntries(response);
    })
  }

    return (
      <>
        <div class = "grid-container">
          <div class = "box1">
            <h1  id = "textSection">
              Assignment 4 By Sean McMillan
            </h1>
          </div>

          <div class = "box2">
            <p id = "textSection">
              Read the REAME.md to read about everything I did in this project!
              To add a row to the list, simply type your name into the box below.
            </p>
          </div>

          <div class = "box3">
            <body id = "nonTextSection">
              <form action="">
                <input type='text' id='yourname' defaultValue="your name here" />
                <button type="button" id="submitButton" onClick={click}>submit</button>
              </form>
            </body>
          </div>

          <div class = "box4">
            <NewTable rows={entries} />
          </div>
        </div>
      </>
    );
}

export default App;
