import React from "react";
import { Game } from "../types";

type Props = {
    selectedGame?: Game;
    callback: (game: Game) => void;
};

const ModifyForm = (props: Props) => {


    const [id, setID] = React.useState<string|undefined>(props.selectedGame?._id);
    const [date, setDate] = React.useState<string|undefined>(props.selectedGame?.date);
    const [hits, setHits] = React.useState<string|undefined>(props.selectedGame?.hits.toString());
    const [atBats, setAtBats] = React.useState<string|undefined>(props.selectedGame?.atBats.toString());


  return (
    <section
      id="modifyForm"
      className="rounded-md shadow-xl bg-white px-4 py-2"
    >
      <h2 className="font-bold text-3xl mb-4">Modify a game report</h2>

      <form
        className="flex flex-col justify-around items-start"
        autoComplete="off"
      >
        <div className="w-full my-2">
          <label htmlFor="idField">ID:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="idField"
            type="text"
            value={id? id : ""}
            disabled
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="modifyDatePicker">Date:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="modifyDatePicker"
            type="date"
            value={date? date : ""}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="modifyHitsField">Hits:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="modifyHitsField"
            type="text"
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="modifyAtBatsField">At Bats:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="modifyAtBatsField"
            type="text"
          />
        </div>

        <div className="flex w-full justify-end">
          <button
            id="modifyBtnDelete"
            className="bg-red-700 hover:bg-red-800 py-2 px-4 text-center font-bold text-white rounded-md mr-1"
          >
            Delete
          </button>
          <button
            id="modifyBtnSubmit"
            className="bg-blue-700 hover:bg-blue-800 py-2 px-4 text-center font-bold text-white rounded-md ml-1"
          >
            Modify Game
          </button>
        </div>
      </form>
    </section>
  );
};

export default ModifyForm;
