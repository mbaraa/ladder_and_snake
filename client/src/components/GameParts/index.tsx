import * as React from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import Middle from "./Middle";
import Game from "../../models/game";

interface Props {
  game: Game;
  update(): void;
}

const GameParts = ({ game, update }: Props): React.ReactElement => {
  return (
    <div className="m-[20px]">
      <TopBar game={game} update={update} />
      <Middle />
      <Footer game={game} update={update} />
    </div>
  );
};

export default GameParts;
