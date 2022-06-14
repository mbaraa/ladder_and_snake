import * as React from "react";
import LoginFragment from "../components/Login/login";
import SignupFragment from "../components/Login/signup";
import { useHistory } from "react-router-dom";

const Login = (): React.ReactElement => {
  const router = useHistory();

  const token = localStorage.getItem("token") ?? "";

  if (token.length !== 0) {
    router.push("/");
  }
  return (
    <>
      <h1 className="text-[#d47a2b] text-center w-[100%] text-[50px]">
        THE GAME
      </h1>
      <div className="grid grid-cols-2">
        <div className="relative left-[50%] translate-x-[-50%] w-[240px]">
          <LoginFragment />
        </div>
        <div className="relative left-[50%] translate-x-[-50%] w-[240px]">
          <SignupFragment />
        </div>
      </div>
    </>
  );
};

export default Login;
