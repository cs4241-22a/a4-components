import React from "react";

import Header from "./components/Header";
import TaskDisplay from "./components/TaskDisplay";
import "./styles/main.css";

function App() {
  console.log("Here");
  return (
    <div className="App">
      <Header />
      <TaskDisplay />
    </div>
  );
}

export default App;
