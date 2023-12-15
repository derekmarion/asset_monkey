import { useEffect, useState } from "react";
import { LogIn } from "../components/Login";
import { SignUp } from "../components/Register";
import { useOutletContext } from "react-router";

export const Home = () => {
  const { login, setLogin } = useOutletContext();

  return (
    <>{login ? (<LogIn />) : (<SignUp />)}</>
    // <LogIn />
  );
};
