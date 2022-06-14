import * as React from "react";

interface Props {
  onClick(): void;
  title: string;
  className?: string;
}

const Button = ({ onClick, title, className }: Props): React.ReactElement => {
  return (
    <>
      <button
        className={`${
          className ?? ""
        } text-center w-[100%] bg-[#dd7826] text-[20px] text-white p-[5px] rounded-[15px] border-[1px] border-[#7d7d7d] hover:bg-[#ee8937]`}
        onClick={onClick}
      >
        {title}
      </button>
    </>
  );
};

export default Button;
