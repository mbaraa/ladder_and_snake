import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import GameParts from "../components/GameParts";
import { default as GameModel } from "../models/game";
import GameRequests from "../utils/game_requests";

const Game = (): React.ReactElement => {
  const { id }: any = useParams();

  const [game, setGame] = React.useState<GameModel | null>(null);
  React.useEffect(() => {
    (async () => {
      setGame(await GameRequests.loadGame(id));
    })();
  }, []);

  if (game === null) {
    return <>Something went wrong...</>;
  }

  return (
    <GameParts
      game={game}
      update={() => {
        setGame({ ...game });
      }}
    />
  );
};

export default Game;
