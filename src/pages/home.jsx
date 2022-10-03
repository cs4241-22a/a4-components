import * as React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link } from "wouter";
import { useState } from "react"; 

// initial class list


/**
* The Home function defines the content that makes up the main content of the Home page
*
* This component is attached to the /about path in router.jsx
* The function in app.jsx defines the page wrapper that this appears in along with the footer
*/

export default function Home() {
  const [dr, setDreams] = 
    useState(
      [{
        className: "calc",
        classNumber: "4444"
      },
      {
        className: "calc2",
        classNumber: "5555"
      }]
    );
  const [className, setClassName] = useState('');
  const [classNumber, setClassNumber] = useState('');

  return (
    <>
      <body class="bg-light">
    
        <h1 class="text-primary ms-1">Class Data Manager</h1>
    
        <p class="text-dark text-left ms-1">Welcome to a website to manage and save your classes</p>
    
        <p class="text-dark ms-1">
          DIRECTIONS: Input your class name and number and press submit to see results. If you enter
          a new class name with the same class number, we will update that class's name
          in the server.
        </p>
        <label>
          Class Name
          <input value={className} onChange={(event) => setClassName(event.target.value)} name="className" type="text" maxlength="100" required placeholder="Class Name"/>
          Class Number
          <input value={classNumber} onChange={(event) => setClassNumber(event.target.value)} name="classNumber" type="text" maxlength="100" required placeholder="Class Number"/>
          </label>
        <button
          id="submit-dream"
          onClick={() => addClass(dr, setDreams, className, classNumber)}
        >
          Add Class
        </button>
        <button 
          id="delete-dream"
          onClick={() => deleteClass(dr, setDreams, className, classNumber)}
        >
          Delete Class
        </button>
        <RenderClasses dreamsList={dr} />
    
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8"
          crossorigin="anonymous"
        ></script>
      </body>
    </>
  );
}



// function to render all classes
function RenderClasses(props){
  const dreamsList = props.dreamsList  
  return(
    <ul>
      {dreamsList.map((dream) => <li key={dream.className}>{dream.className}, Number {dream.classNumber}, Level {Math.floor(parseInt(dream.classNumber)/1000)}</li>)}
    </ul>
  )
}

function addClass(dr, setHook, cname, cnum) {
  setHook(dr.concat([{className: cname, classNumber: cnum}]));
}

function deleteClass(dr, setHook, cname, cnum) {
  setHook(dr.filter((elt) => elt.className != cname || elt.classNumber != cnum));

}
