import * as React from "react";

interface Props {
  update(value: string): void;
  inputType: "text" | "password";
  placeHolder: string;
  className?: string;
}

const Input = ({
  update,
  inputType,
  placeHolder,
  className,
}: Props): React.ReactElement => {
  return (
    <>
      <input
        type={inputType}
        className="bg-[#cccbc9] text-[#6c6a6b] p-[10px] rounded-[15px] border-[1px] border-[#7d7d7d] w-[100%]"
        placeholder={placeHolder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          update(event.target.value);
        }}
      />
    </>
  );
};

export default Input;
