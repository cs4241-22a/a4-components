import React, { useState } from "react";

export default function Form(props) {
  const [name, setName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [food, setFood] = useState("");

  function handleChange(event, setFunction) {
    setFunction(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: name,
      yourgradyear: gradYear,
      food: food,
    };

    const body = JSON.stringify(data);

    fetch("/add", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => props.onSubmit());
  }

  function handleDelete(event) {
    event.preventDefault();

    fetch("/delete", {
      method: "POST",
    }).then(() => props.onSubmit());
  }

  return (
    <form>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => handleChange(event, setName)}
        />
      </label>

      <label>
        Grad Year:
        <input
          type="text"
          value={gradYear}
          onChange={(event) => handleChange(event, setGradYear)}
        />
      </label>

      <label>
        Food Choice:
        <input
          type="text"
          value={food}
          onChange={(event) => handleChange(event, setFood)}
        />
      </label>

      <button onClick={handleSubmit}> Submit </button>

      <button onClick={handleDelete}> Delete All </button>
    </form>
  );
}
