import * as React from "react";
import GameRequests from "../../utils/game_requests";
import Game from "../../models/game";
import Button from "../Button";
import { useHistory } from "react-router-dom";

interface Props {
  game: Game;
  update(): void;
}

const TopBar = ({ game, update }: Props): React.ReactElement => {
  const router = useHistory();

  const newGame = async () => {
    const _game = await GameRequests.newGame();
    await (async () => {
      game.total_dice_rolls = 0;
      game.player_1_location = 1;
      game.player_2_location = 1;
      update();
      router.push(`/game/${_game?.id}`);
    })();
  };

  const saveGame = async () => {
    // somehow the router.push needs to be before saveGame
    await (async () => {
      router.push(`/login`);
    })();
    await GameRequests.saveGame(game);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <label className="text-[#dd7826] text-[30px]">
            Total Dice Rolls: {game?.total_dice_rolls}
          </label>
        </div>
        <div className="right-[20px] absolute">
          <Button title="New Game" onClick={newGame} className="w-[200px]" />{" "}
          <Button title="Save Game" onClick={saveGame} className="w-[200px]" />
        </div>
      </div>
    </>
  );
};

export default TopBar;
