import React from "react";
import { UserContext } from ".";
import { User } from "../../models/user";

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [user, setUser] = React.useState<User | null>(null);

  let signIn = (newUser: User) => {
    setUser(newUser);
  };

  let signOut = () => {
    setUser(null);
  };

  let value = { user, signIn, signOut };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
