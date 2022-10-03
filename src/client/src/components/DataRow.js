import React from "react";
import "./DataRow.css";

const DataRow = (props) => {
  const handleModifyOnClick = () => {
    props.modifyOnClick(props.record);
  };
  const handleDeleteOnClick = () => {
    props.deleteOnClick(props.record);
  };
  return (
    <tr>
      <td>{props.record.playerName}</td>
      <td>{props.record.playerScore}</td>
      <td>{props.record.winResult.toString()}</td>
      <td className="modifyCell" onClick={handleModifyOnClick}></td>
      <td className="deleteCell" onClick={handleDeleteOnClick}></td>
    </tr>
  );
};

export default DataRow;
