import React from "react";
import { Game } from "../types";

type Props = {
    callback: (game: Game) => void;
};


const SubmitForm = (props: Props) => {

    const [date, setDate] = React.useState("");
    const [hits, setHits] = React.useState("");
    const [atBats, setAtBats] = React.useState("");

    const submitGame = (date: string, hits: string, atBats: string) => {
        fetch("https://baseball-react.axbolduc.com/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: date,
                hits: parseInt(hits),
                atBats: parseInt(atBats),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                props.callback(data);
            })
            .catch((err) => {
                if(process.env.NODE_ENV === "development"){

                //Mock data
                props.callback({
                    _id: Math.random().toString(36).substr(2, 9),
                    date: date,
                    hits: parseInt(hits),
                    atBats: parseInt(atBats),
                    avg: parseInt(hits) / parseInt(atBats),
                    owner: "6320c57f9e2f1b1146b1a2ee",
                });
              }else{
                console.error("Error submitting game: ", err);
              }
            });
    }


  return (
    <section
      id="submissionForm"
      className="visible rounded-md shadow-xl bg-white px-4 py-2"
    >
      <h2 className="font-bold text-3xl mb-4">Add a game report</h2>

      <form
        className="flex flex-col justify-around items-start"
        autoComplete="off"
      >
        <div className="w-full my-2">
          <label htmlFor="submitDatePicker">Date:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="submitDatePicker"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="submitHitsField">Hits:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="submitHitsField"
            type="text"
            onChange={(e) => setHits(e.target.value)}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="submitAtBatsField">At Bats:</label>
          <input
            className="bg-gray-200 rounded-md w-full px-4 py-2"
            id="submitAtBatsField"
            type="text"
            onChange={(e) => setAtBats(e.target.value)}
          />
        </div>

        <div className="flex justify-end w-full my-2">
          <button
            id="submitBtnSubmit"
            className="bg-blue-700 hover:bg-blue-800 py-2 px-4 text-center font-bold text-white rounded-md"
            onClick={(e) => {
                e.preventDefault();
                submitGame(date, hits, atBats)
            }}
          >
            Add Game
          </button>
        </div>
      </form>
    </section>
  );
};

export default SubmitForm;
