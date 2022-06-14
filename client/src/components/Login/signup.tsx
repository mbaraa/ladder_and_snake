import * as React from "react";
import Player from "../../models/player";
import Input from "../Input";
import PlayerRequests from "../../utils/player_requests";
import Button from "../Button";
import { useHistory } from "react-router-dom";

const SignupFragment = (): React.ReactElement => {
  const router = useHistory();
  const [player, setPlayer] = React.useState<Player>({
    username: "",
    password: "",
    full_name: "",
  });

  const signup = async () => {
    await PlayerRequests.signup(player);
    router.push("/");
  };

  return (
    <div className="">
      <h1 className="color-black text-[30px] mb-[15px] text-center w-[100%]">
        Register
      </h1>
      <Input
        update={(s: string) => {
          player.full_name = s;
          setPlayer({ ...player });
        }}
        inputType="text"
        placeHolder="Full Name"
      />
      <div className="block mt-[15px]" />
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
      <Button onClick={signup} title="Register" />
    </div>
  );
};

export default SignupFragment;