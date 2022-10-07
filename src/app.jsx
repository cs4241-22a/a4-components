import React, { useState, useEffect } from "react";
import UserTable from "./Table.jsx";
import './styles/styles.css';
import FormTwo from "./AppointForm.jsx";
import FormOne from "./EditForm.jsx";
   
const App = () => {
  const [appoints, setAppoints] = useState(() => {
    const savedAppoints = localStorage.getItem("Appoints");
    if (savedAppoints) {
      return JSON.parse(savedAppoints);
    } else {
      return [];
    }
  });
  
    useEffect(() => {
    localStorage.setItem("Appoints", JSON.stringify(appoints));
  }, [appoints]);
  
  const addAppoint = (appoint) => {
    var max = 0;
    for(let i = 0; i < appoints.length;  i++){
      if(appoints[i].id > max){
        max = appoints[i].id;
      }
    }
    appoint.id = max + 1;
    setAppoints([...appoints, appoint]);
  };

  const deleteAppoint = (id) => {
    setAppoints(appoints.filter((appoint) => appoint.id !== id));
  };

  const [editing, setEditing] = useState(false);

  const initialAppoint = { id: null, studentID: "", name: "", appointment: "" };

  const [currentAppoint, setCurrentAppoint] = useState(initialAppoint);

  const editAppoint = (id, appoint) => {
    setEditing(true);
    setCurrentAppoint(appoint);
  };

  const updateAppoint = (newAppoint) => {
    setAppoints(
      appoints.map((appoint) => (appoint.id === currentAppoint.id ? newAppoint : appoint))
    );
    setCurrentAppoint(initialAppoint);
    setEditing(false);
  };

  
  return (
    
    <div>
      <h1>
      <section class="purple"><div class="blink-bg">Jackie's Chicano Art Museum</div></section>
      </h1>
      <div>
        <div>
          {editing ? (
            <div>
              <h2> About <i>El Movimiento</i></h2>
              <FormOne
                currentAppoint={currentAppoint}
                setEditing={setEditing}
                updateAppoint={updateAppoint}
              />
            </div>
          ) : (
            <div>
              
              <h2>About <i>El Movimiento</i></h2>
              <span class="smdot1"></span>
              <span class="smdot2"></span>
              <span class="smdot3"></span>
              <span class="smdot4"></span>
              <span class="smdot1"></span>
              <span class="smdot2"></span>
              <span class="smdot3"></span>
              <span class="smdot4"></span>
              
              <p>
              Welcome to Jackie's Art Museum! As a "Chicana" herself, Jackie wanted to share with the world her passion for Chicano Art.
              </p>
              
              
              <p>
              Known as <i>El Movimiento</i>, The Chicano Movement began in the late 1960's and early 1970s that advocated social and political 
              empowerment through a chicanismo / cultural nationalism. This was a way for Chicanos to form and develop a collective identity
              that distinguised itself as Mexican-American to reject assimilation to the Euro-Centric American culture.
              </p>
              
              <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/artists-2-1626385417.jpg" alt="" />

              <p> 
              Many of the exhibits here showcase some of the most inspiring art from popular Chicano Artists such as:

              <ul>
                <li><a href="https://americanart.si.edu/artist/yreina-d-cervantez-5982"> Yreina Cervantez</a></li>
                <li><a href="https://www.somosla.net/"> Chaz Bojorquez</a></li>
                <li><a href="https://www.areaarts.com/richard-duardo/"> Richard Duardo</a></li>
                <li><a href="https://www.artsy.net/artist/gilbert-magu-lujan">Magú</a></li>
              </ul>
              </p>
            
             <span class="smdot1"></span>
             <span class="smdot2"></span>
             <span class="smdot3"></span>
             <span class="smdot4"></span>
             <span class="smdot1"></span>
             <span class="smdot2"></span>
             <span class="smdot3"></span>
             <span class="smdot4"></span>
              
              
             <h2> Registration</h2>
             <p>
              If you would like to visit our museum, please register below for an appointment. 
              Due to the increase of covid, we must take precautions and limit our capacity
              for our safety and yours.
             </p>
    
              <FormTwo addAppoint={addAppoint} />
            </div>
          )}
        </div>
        <div>
          <UserTable
            appoints={appoints}
            deleteAppoint={deleteAppoint}
            editAppoint={editAppoint}
          />
        </div>
      </div>
    </div>
  );
};

export default App;