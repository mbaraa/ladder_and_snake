import * as React from "react";
import Game from "../../models/game";
import Button from "../Button";

interface Props {
  game: Game;
  update(): void;
}

const Footer = ({ game, update }: Props): React.ReactElement => {
  const [dice, setDice] = React.useState(0);
  const rollDice = () => {
    setDice(Math.trunc(((Math.random() * 100) % 6) + 1));
    if (game?.current_player === 1) {
      game.player_1_location += dice;
    } else {
      game.player_2_location += dice;
    }
    update();
  };

  return (
    <>
      <div className="grid grid-cols-2 border-t-2 border-t-black">
        <div className="pt-[30px]">
          <div className="w-[100px] h-[40px] bg-[#58c3a9] inline-block border-2 border-black">
            <div className="pt-[3px] ml-[44px] font-bold text-[20px]">
              {dice}
            </div>
          </div>{" "}
          <Button
            title="Roll Dice"
            className="w-[150px] pt-[3px] h-[40px] bg-[#acadb1] rounded-[0%] border-2 border-black"
            onClick={() => {
              game.total_dice_rolls++;
              game.current_player = game.current_player === 1 ? 2 : 1;
              rollDice();
              update();
            }}
          />
        </div>
        <div className="absolute right-[20px]">
          <div className="pt-[3px] font-bold text-[20px]">Current Turn</div>
          <div className="w-[100px] h-[40px] bg-[#58c3a9] inline-block border-2 border-black">
            <div className="pt-[3px] ml-[11px] font-bold text-[20px]">
              Player {game?.current_player}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
