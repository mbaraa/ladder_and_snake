import * as React from "react";

interface Props {
  currentPlayer: number;
  cellNumber: number;
}

const BoardCell = ({
  currentPlayer,
  cellNumber,
}: Props): React.ReactElement => {
  return (
    <div className="bg-[#d29dad] h-[65px] w-[100px] border-2 border-black text-white">
      <div className="grid grid-cols-2">
        <div>
          {(currentPlayer & 1) !== 0 && (
            <label className="rounded-[100%] text-green-700 font-bold bg-black p-[2px] m-[2px]">
              P1
            </label>
          )}
          <br />
          {(currentPlayer & 2) !== 0 && (
            <label className="rounded-[100%] text-purple-700 font-bold bg-black p-[2px] m-[2px]">
              P2
            </label>
          )}
        </div>
        <div>
          <label className="font-bold text-[20px]">{cellNumber}</label>
        </div>
      </div>
    </div>
  );
};

export default BoardCell;
