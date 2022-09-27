import React from "react";
import { Game } from "../types";

type Props = {
    game: Game;
    onClick: (game: Game) => void;
};

const GameRow = (props: Props) => {
    const { game } = props;
  return (
    <tr className="border-b border-gray-200" onClick={() => props.onClick(game)}>
      <td className="px-4 py-2 hidden">{game._id}</td>
      <td className="px-4 py-2">{game.date}</td>
      <td className="px-4 py-2">{game.hits.toString()}</td>
      <td className="px-4 py-2">{game.atBats.toString()}</td>
      <td className="px-4 py-2">{game.avg.toFixed(2).toString()}</td>
    </tr>
  );
};

export default GameRow;
