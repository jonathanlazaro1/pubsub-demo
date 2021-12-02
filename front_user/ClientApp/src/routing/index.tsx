import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { AppNavBar } from "../components/navbar";
import { UserContextProvider } from "../context/user/provider";
import { HomeScreen } from "../screens/home";
import { OperationsListScreen } from "../screens/operations/list";
import { UserCreateScreen } from "../screens/users/create";
import { UserSelectScreen } from "../screens/users/select";
import { RequireUser } from "./require-user";
import { AppRoutes } from "./routes";

export function MainRouter() {
  return (
    <UserContextProvider>
      <AppNavBar />
      <Container>
        <div className="mt-3">
          <Routes>
            <Route
              path={AppRoutes.HOME}
              element={
                <RequireUser>
                  <HomeScreen />
                </RequireUser>
              }
            />
            <Route
              path={AppRoutes.OPERATIONS_LIST}
              element={
                <RequireUser>
                  <OperationsListScreen />
                </RequireUser>
              }
            />
            <Route
              path={AppRoutes.USER_SELECT}
              element={<UserSelectScreen />}
            />
            <Route
              path={AppRoutes.USER_CREATE}
              element={<UserCreateScreen />}
            />
          </Routes>
        </div>
      </Container>
    </UserContextProvider>
  );
}
