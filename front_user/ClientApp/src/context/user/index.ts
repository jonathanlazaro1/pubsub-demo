import React from "react";
import { User } from "../../models/user";

interface UserContextType {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export function useUserContext() {
  return React.useContext(UserContext);
}
