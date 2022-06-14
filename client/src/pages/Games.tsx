import * as React from "react";
import Player from "../models/player";
import { useHistory } from "react-router-dom";
import HomePage from "../components/HomePage";

interface Props {
  player: Player;
}

const Games = ({ player }: Props): React.ReactElement => {
  const router = useHistory();

  if (player === null) {
    router.push("/login");
  }

  return (
    <>
      <HomePage player={player} />
    </>
  );
};

export default Games;
