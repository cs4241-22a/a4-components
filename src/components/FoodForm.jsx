import { useState } from "react";

function FoodForm({ setFoods }) {
  const [name, setName] = useState("Food Name");
  const [type, setType] = useState("Meat");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const json = {
        foodname: name,
        foodtype: type,
        foodweight: parseFloat(amount),
        foodprice: parseFloat(price),
      },
      body = JSON.stringify(json);
    fetch("/submit", {
      method: "POST",
      body: body,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFoods(data);
      });
  };

  const onTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div>
      <h2>Add Food</h2>
      <form id="add-food-form">
        <h3 className="input-header">Food Name</h3>
        <input
          type="text"
          id="foodname"
          value={name}
          aria-label="Food Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <h3 className="input-header">Food Type</h3>
        <fieldset id="radio-box">
          <input
            type="radio"
            name="foodtype"
            id="meat"
            value="Meat"
            checked={type === "Meat"}
            onChange={(e) => onTypeChange(e)}
          />
          <label className="radio-label" htmlFor="meat">
            Meat
          </label>
          <br />
          <input
            type="radio"
            name="foodtype"
            id="fruit"
            value="Fruit"
            checked={type === "Fruit"}
            onChange={(e) => onTypeChange(e)}
          />
          <label className="radio-label" htmlFor="fruit">
            Fruit
          </label>
          <br />
          <input
            type="radio"
            name="foodtype"
            id="vegetable"
            value="Vegetable"
            checked={type === "Vegetable"}
            onChange={(e) => onTypeChange(e)}
          />
          <label className="radio-label" htmlFor="vegetable">
            Vegetable
          </label>
          <br />
          <input
            type="radio"
            name="foodtype"
            id="dairy"
            value="Dairy"
            checked={type === "Dairy"}
            onChange={(e) => onTypeChange(e)}
          />
          <label className="radio-label" htmlFor="dairy">
            Dairy
          </label>
          <br />
          <input
            type="radio"
            name="foodtype"
            id="other"
            value="Other"
            checked={type === "Other"}
            onChange={(e) => onTypeChange(e)}
          />
          <label className="radio-label" htmlFor="other">
            Other
          </label>
          <br />
        </fieldset>
        <h3 className="input-header">Food Amount (lbs)</h3>
        <input
          type="number"
          id="foodweight"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-label="Food Weight"
        />
        <br />
        <h3 className="input-header">Price ($)</h3>
        <input
          type="number"
          id="foodprice"
          min="0"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          aria-label="Food Price"
        />
        <br />
        <div id="button-box">
          <button id="submit-button" onClick={(e) => handleSubmit(e)}>
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
}

export default FoodForm;
