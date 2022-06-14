import * as React from "react";
import Game from "../../models/game";
import GameRequests from "../../utils/game_requests";
import Button from "../Button";
import { useHistory } from "react-router-dom";

const AvailableGames = (): React.ReactElement => {
  const router = useHistory();

  const [games, setGames] = React.useState<Game[] | null>(null);
  React.useEffect(() => {
    (async () => {
      setGames(await GameRequests.loadGames());
    })();
  }, []);

  const loadGame = (id: number) => {
    router.push(`/game/${id}`);
  };

  return (
    <div className="mt-[20px] h-[100%] mx-[10px]">
      <table className="border-2 border-black w-[100%] h-[100%]">
        <thead>
          <tr className="border-2 border-black">
            <th>Load Saved Games</th>
          </tr>
        </thead>
        <tbody>
          {games &&
            games.map((game) => (
              <tr key={game.id}>
                <td className="border-b-2 border-b-gray-400">
                  <div className="grid grid-cols-2">
                    <div>Game Saved At {game.save_date.toString()} </div>
                    <div>
                      <Button
                        title="Load"
                        onClick={() => {
                          loadGame(game.id);
                        }}
                        className="w-[100px] p-0 text-[15px]"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableGames;
