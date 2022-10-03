import React from "react";

export default function Table(props) {
  console.log(props);
  return (
    <table class="table" id="resulttable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Graduation Year</th>
          <th>Food Choice</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data) => {
          return (
            <tr>
              <th scope="row">{data.name}</th>
              <td>{data.yourgradyear}</td>
              <td>{data.food}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
