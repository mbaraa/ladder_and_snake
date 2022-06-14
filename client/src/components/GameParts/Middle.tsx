import * as React from "react";
import Game from "../../models/game";
import Board from "./Board";
import BoardCell from "./BoardCell";
import Scoring from "./Scoring";

interface Props {
  game: Game;
  update(): void;
}

const Middle = ({ game, update }: Props): React.ReactElement => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <Board game={game} update={update} />
        </div>
        <div>
          <Scoring />
        </div>
      </div>
    </>
  );
};

export default Middle;
