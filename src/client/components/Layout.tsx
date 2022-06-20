import {ReactNode} from "react";
import NavBar from "Components/NavBar";

type Props = {
  children: ReactNode;
};

export default ({children}: Props) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
