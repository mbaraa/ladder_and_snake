import * as React from "react";

interface Props {}

const Scoring = ({}: Props): React.ReactElement => {
  return (
    <>
      <img src="/scores.png" className="h-[390px] absolute right-[35px]" />
    </>
  );
};

export default Scoring;
