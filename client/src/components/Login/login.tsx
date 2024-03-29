import * as React from "react";
import Player from "../../models/player";
import Input from "../Input";
import PlayerRequests from "../../utils/player_requests";
import Button from "../Button";

const LoginFragment = (): React.ReactElement => {
  const [player, setPlayer] = React.useState<Player>({
    username: "",
    password: "",
    full_name: "",
  });

  const login = async () => {
    const _player = await PlayerRequests.login(player);
    if (_player === null) {
      window.alert("invalid credintials");
    }
    window.location.reload();
  };

  return (
    <div className="">
      <h1 className="color-black text-[30px] mb-[15px] text-center w-[100%]">
        Login
      </h1>
      <Input
        update={(s: string) => {
          player.username = s;
          setPlayer({ ...player });
        }}
        inputType="text"
        placeHolder="Username"
      />
      <div className="block mt-[15px]" />
      <Input
        update={(s: string) => {
          player.password = s;
          setPlayer({ ...player });
        }}
        inputType="password"
        placeHolder="Password"
      />
      <div className="block mt-[15px]" />
      <Button onClick={login} title="Login" />
    </div>
  );
};

export default LoginFragment;
