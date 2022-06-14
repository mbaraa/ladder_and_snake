import * as React from "react";
import Player from "../../models/player";
import AvailableGames from "./AvaliableGames";
import NewGame from "./NewGame";
import WelcomeMessage from "./WelcomeMessage";

interface Props {
  player: Player;
}

const HomePage = ({ player }: Props): React.ReactElement => {
  return (
    <div className="absolute left-[50%] translate-x-[-50%] w-[100%]">
      <WelcomeMessage name={player.full_name} />
      <NewGame />
      <AvailableGames />
    </div>
  );
};

export default HomePage;
