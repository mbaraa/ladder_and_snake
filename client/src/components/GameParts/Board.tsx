import * as React from "react";
import BoardCell from "./BoardCell";
import Game from "../../models/game";
import Button from "../Button";

interface Props {
  game: Game;
  update(): void;
}

interface Cell {
  currentPlayer: 0 | 1 | 2 | 3;
  cellNumber: number;
}

const Board = ({ game, update }: Props): React.ReactElement => {
  const [cells, setCells] = React.useState([
    { currentPlayer: 0, cellNumber: 21 },
    { currentPlayer: 0, cellNumber: 22 },
    { currentPlayer: 0, cellNumber: 23 },
    { currentPlayer: 0, cellNumber: 24 },
    { currentPlayer: 0, cellNumber: 17 },
    { currentPlayer: 0, cellNumber: 18 },
    { currentPlayer: 0, cellNumber: 19 },
    { currentPlayer: 0, cellNumber: 20 },
    { currentPlayer: 0, cellNumber: 16 },
    { currentPlayer: 0, cellNumber: 15 },
    { currentPlayer: 0, cellNumber: 14 },
    { currentPlayer: 0, cellNumber: 13 },
    { currentPlayer: 0, cellNumber: 9 },
    { currentPlayer: 0, cellNumber: 10 },
    { currentPlayer: 0, cellNumber: 11 },
    { currentPlayer: 0, cellNumber: 12 },
    { currentPlayer: 0, cellNumber: 8 },
    { currentPlayer: 0, cellNumber: 7 },
    { currentPlayer: 0, cellNumber: 6 },
    { currentPlayer: 0, cellNumber: 5 },
    { currentPlayer: 0, cellNumber: 1 },
    { currentPlayer: 0, cellNumber: 2 },
    { currentPlayer: 0, cellNumber: 3 },
    { currentPlayer: 0, cellNumber: 4 },
  ]);

  React.useEffect(() => {
    if (game.player_1_location === 1 && game.player_2_location === 1) {
      cells[cells.findIndex((cell) => cell.cellNumber === 1)].currentPlayer = 3;
    }
    if (game.player_1_location !== 1) {
      cells[
        cells.findIndex((cell) => cell.cellNumber === game.player_1_location)
      ].currentPlayer |= 1;
    }

    if (game.player_2_location !== 1) {
      cells[
        cells.findIndex((cell) => cell.cellNumber === game.player_2_location)
      ].currentPlayer |= 2;
    }

    setCells(cells.flat());
    update();
  }, []);

  const finishGame = () => {};

  const [dice, setDice] = React.useState(0);

  const isLadder = (cell: number): boolean => {
    return cell === 13 || cell === 7 || cell === 3;
  };

  const isSnake = (cell: number): boolean => {
    return cell === 11 || cell === 23 || cell === 16;
  };

  const moveSnake = (cell: number): number => {
    return cell === 11 ? 2 : cell === 23 ? 5 : cell === 16 ? 8 : cell;
  };
  const moveLadder = (cell: number): number => {
    return cell === 13 ? 22 : cell === 7 ? 14 : cell === 3 ? 10 : cell;
  };

  const moveCell = (cell: number): number => {
    setDice(Math.trunc(((Math.random() * 100) % 6) + 1));
    let newCell = cell + dice;
    if (isSnake(newCell)) {
      newCell = moveSnake(newCell);
    } else if (isLadder(newCell)) {
      newCell = moveLadder(newCell);
    }

    if (newCell > 24) {
      return cell;
    }

    return newCell;
  };

  const handleCollision = () => {
    if (game.player_1_location === game.player_2_location) {
      if (game.player_1_location % 2 !== 0) {
        game.player_1_location -= Math.min(5, game.player_1_location);
      } else {
        game.player_2_location -= Math.min(5, game.player_2_location);
      }
    }
  };

  const rollDice = () => {
    if (dice === 0) {
      setDice(Math.trunc(((Math.random() * 100) % 6) + 1));
      return;
    }

    const freshGame =
      game.player_1_location === 1 && game.player_2_location === 2;

    cells[
      cells.findIndex(
        (cell) => (cell.currentPlayer & game.current_player) !== 0
      )
    ].currentPlayer -= game.current_player;

    if (game.current_player === 1) {
      game.player_1_location = moveCell(game.player_1_location);
      handleCollision();
      cells[
        cells.findIndex((cell) => cell.cellNumber === game.player_1_location)
      ].currentPlayer |= 1;
    } else {
      game.player_2_location = moveCell(game.player_2_location);
      handleCollision();
      cells[
        cells.findIndex((cell) => cell.cellNumber === game.player_2_location)
      ].currentPlayer |= 2;
    }

    setCells(cells.flat());

    game.total_dice_rolls++;
    if (!freshGame) {
      game.current_player = game.current_player === 1 ? 2 : 1;
    }
    update();
  };

  return (
    <>
      <div className="grid grid-cols-4 w-[400px]">
        {cells.map((cell) => (
          <BoardCell
            key={cell.cellNumber}
            currentPlayer={cell.currentPlayer}
            cellNumber={cell.cellNumber}
          />
        ))}
      </div>

      <div className="grid grid-cols-2">
        <div className="pt-[30px]">
          <div className="w-[100px] h-[40px] bg-[#58c3a9] inline-block border-2 border-black">
            <div className="pt-[3px] ml-[44px] font-bold text-[20px]">
              {dice}
            </div>
          </div>{" "}
          <Button
            title={dice === 0 ? "Start Game!" : "Roll Dice"}
            className="w-[150px] pt-[3px] h-[40px] bg-[#acadb1] rounded-[0%] border-2 border-black"
            onClick={rollDice}
          />
        </div>
        <div className="absolute right-[20px]">
          <div className="pt-[3px] font-bold text-[20px]">Current Turn</div>
          <div className="w-[100px] h-[40px] bg-[#c88c72] inline-block border-2 border-black">
            <div className="pt-[3px] ml-[11px] font-bold text-[20px]">
              Player {game?.current_player}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
