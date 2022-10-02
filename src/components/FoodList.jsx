import { useEffect, useState } from "react";

function FoodList({ foodItems, setFoods }) {
  const handleDelete = (e) => {
    e.preventDefault();

    const body = JSON.stringify(e.target.value);
    fetch("/delete", {
      method: "POST",
      body: body,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoods(data);
      });
  };

  const foodList =
    foodItems === undefined
      ? null
      : foodItems.map((food) => (
          <tr>
            <td>{food.foodname}</td>
            <td>{food.foodtype}</td>
            <td>{food.foodweight}</td>
            <td>{food.foodprice}</td>
            <td>{food.priceperpound}</td>
            <td>
              <button
                name="delete-select"
                type="checkbox"
                value={food.id}
                onClick={(e) => handleDelete(e)}
                aria-label="Food Selector"
              >
                Delete
              </button>
            </td>
          </tr>
        ));

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Weight (lbs)</th>
        <th>Price ($)</th>
        <th>$/Lbs</th>
        <th>Delete Food</th>
      </tr>
      {foodList}
    </table>
  );
}

export default FoodList;
