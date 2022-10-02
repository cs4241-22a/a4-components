import React from "react";
import { Game } from "../types";

type Props = {
  selectedGame?: Game;
  modifyCallback: (game: Game) => void;
  deleteCallback: (id: string) => void;
};

const ModifyForm = (props: Props) => {
  const [id, setID] = React.useState<string | undefined>(
    props.selectedGame?._id
  );
  const [date, setDate] = React.useState<string | undefined>(
    props.selectedGame?.date
  );
  const [hits, setHits] = React.useState<string | undefined>(
    props.selectedGame?.hits.toString()
  );
  const [atBats, setAtBats] = React.useState<string | undefined>(
    props.selectedGame?.atBats.toString()
  );

  const deleteGameRequest = () => {
    fetch(`/games`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.deleteCallback(data._id);
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "development") {
          if (id) {
            props.deleteCallback(id);
          }
        } else {
          console.error("Error deleting game: ", err);
        }
      });
  };

  const modifyGameRequest = () => {
    if (id && date && hits && atBats) {
      fetch(`/games`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          date,
          hits: parseInt(hits),
          atBats: parseInt(atBats),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          props.modifyCallback(data);
        })
        .catch((err) => {
          if (process.env.NODE_ENV === "development") {
            props.modifyCallback({
              _id: id,
              date: date,
              hits: parseInt(hits),
              atBats: parseInt(atBats),
              avg: parseInt(hits) / parseInt(atBats),
              owner: "6320c57f9e2f1b1146b1a2ee",
            });
          } else {
            console.error("Error modifying game: ", err);
          }
        });
    }
  };

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
            value={id ? id : ""}
            disabled
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="modifyDatePicker">Date:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="modifyDatePicker"
            type="date"
            value={date ? date : ""}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="modifyHitsField">Hits:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="modifyHitsField"
            type="text"
            value={hits ? hits : ""}
            onChange={(e) => setHits(e.target.value)}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="modifyAtBatsField">At Bats:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="modifyAtBatsField"
            type="text"
            value={atBats ? atBats : ""}
            onChange={(e) => setAtBats(e.target.value)}
          />
        </div>

        <div className="flex w-full justify-end">
          <button
            id="modifyBtnDelete"
            className="bg-red-700 hover:bg-red-800 py-2 px-4 text-center font-bold text-white rounded-md mr-1"
            onClick={(e) => {
              e.preventDefault();
              deleteGameRequest();
            }}
          >
            Delete
          </button>
          <button
            id="modifyBtnSubmit"
            className="bg-blue-700 hover:bg-blue-800 py-2 px-4 text-center font-bold text-white rounded-md ml-1"
            onClick={(e) => {
              e.preventDefault();
              modifyGameRequest();
            }}
          >
            Modify Game
          </button>
        </div>
      </form>
    </section>
  );
};

export default ModifyForm;
