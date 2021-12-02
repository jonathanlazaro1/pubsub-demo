import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/user";
import { AppRoutes } from "./routes";

export function RequireUser({ children }: { children: JSX.Element }) {
  const userContext = useUserContext();

  if (!userContext?.user) {
    return <Navigate to={AppRoutes.USER_SELECT} />;
  }

  return children;
}
