import { useEffect, useState } from "react";
import "./App.css";
import FoodForm from "./components/FoodForm";
import FoodList from "./components/FoodList";

function App() {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    fetch("/get-food", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFoodList(data);
      });
  }, []);

  return (
    <div className="App">
      <head>
        <title>Grocery List Tracker</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Grocery List Tracker" />
        <link rel="stylesheet" href="css/style.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
        />
      </head>
      <body>
        <h1>Grocery List Tracker</h1>
        <FoodForm setFoods={setFoodList} />
        <FoodList foodItems={foodList} setFoods={setFoodList} />
      </body>
    </div>
  );
}

export default App;
