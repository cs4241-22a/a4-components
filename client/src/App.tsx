import { Key, useCallback, useEffect, useState } from "react";
import GameRow from "./components/GameRow";
import ModifyForm from "./components/ModifyForm";
import SubmitForm from "./components/SubmitForm";
import { Game } from "./types";

function App() {
  const [isSubmitForm, setIsSubmitForm] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined);
  const [currentGames, setCurrentGames] = useState<Game[]>([]);

  const submitGame = useCallback((game: Game) => {
    setCurrentGames((games) => [...games, game]);
  }, []);

  const modifyGame = useCallback(
    (game: Game) => {
      const newGames = currentGames.map((g) => {
        if (g._id === game._id) {
          return game;
        }
        return g;
      });
      setCurrentGames(newGames);
    },
    [currentGames]
  );

const deleteGame = useCallback(
    (id: string) => {
      const newGames = currentGames.filter((g) => g._id !== id);
      setCurrentGames(newGames);
    },
    [currentGames]
  );

  const selectGame = (game: Game) => {
    console.log(game);
    setSelectedGame(game);
    setIsSubmitForm(!isSubmitForm);
  };

  //useEffect on page load to fetch data from API
  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((data) => {
        setCurrentGames(data);
      })
      .catch((err) => {
        //Mock data if API is not available

        setCurrentGames([
          {
            _id: "6320ccfd46aa4e358e64a3f3",
            date: "2022-09-13",
            hits: 1,
            atBats: 2,
            avg: 0.5,
            owner: "6320c57f9e2f1b1146b1a2ee",
          },
          {
            _id: "63229dbf772929d3fba4d620",
            owner: "6320c57f9e2f1b1146b1a2ee",
            avg: 0.3333333333333333,
            atBats: 3,
            hits: 1,
            date: "2022-09-15",
          },
          {
            _id: "63234b0c37995750a3cfd8a0",
            owner: "6320c57f9e2f1b1146b1a2ee",
            avg: 0.4,
            atBats: 5,
            hits: 2,
            date: "2022-09-16",
          },
        ]);
      });
  }, []);

  return (
    <main className="flex flex-col items-center py-2 text-2xl">
      <section>
        <table className="table-auto bg-white shadow-2xl w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 hidden">Game ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Hits</th>
              <th className="px-4 py-2">At Bats</th>
              <th className="px-4 py-2">Batting Average</th>
            </tr>
          </thead>
          <tbody id="tableBody" className="overflow-hidden">
            {currentGames.map((game) => {
              return (
                <GameRow
                  key={game._id as Key}
                  game={game}
                  onClick={selectGame}
                />
              );
            })}
          </tbody>
        </table>
      </section>
      <section className="my-6">
        {isSubmitForm ? (
          <SubmitForm callback={submitGame} />
        ) : (
          <ModifyForm selectedGame={selectedGame} modifyCallback={modifyGame} deleteCallback={deleteGame}/>
        )}
      </section>
    </main>
  );
}

export default App;
