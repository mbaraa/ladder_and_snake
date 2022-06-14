import * as React from "react";
import Player from "../../models/player";
import { useHistory } from "react-router-dom";
import GameRequests from "../../utils/game_requests";
import Button from "../Button";

const NewGame = (): React.ReactElement => {
  const router = useHistory();

  const newGame = async () => {
    const game = await GameRequests.newGame();
    router.push(`/game/${game?.id}`);
  };

  return (
    <>
      <h6 className="text-center w-[100%] mt-[10px]">
        <Button
          title="New Game"
          onClick={newGame}
          className="p-[10px] w-[300px] font-bold text-[28px]"
        />
      </h6>
    </>
  );
};

export default NewGame;
