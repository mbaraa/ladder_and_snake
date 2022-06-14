import * as React from "react";
import Button from "../Button";

interface Props {
  name: string;
}

const WelcomeMessage = ({ name }: Props): React.ReactElement => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <h1 className="text-[#d47a2b] text-center w-[100%] text-[50px]">
        HELLO, <label className="text-black text-[50px]">{name}</label>
      </h1>
      <h6 className="text-center w-[100%]">
        <Button title="Logout" onClick={logout} className="w-[300px]" />
      </h6>
    </>
  );
};

export default WelcomeMessage;
