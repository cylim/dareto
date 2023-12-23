import { useContext } from "react";
import { AuthContext } from "./Auth";

import { Login } from "./Login";
import { Logout } from "./Logout";

export const AuthAction = () => {
  const { user } = useContext(AuthContext);

  return user !== undefined && user !== null ? (
      <Logout />
  ) : (
    <Login />
  )
};
