import React, { createContext, useEffect, useState } from "react";
import { User, authSubscribe } from "@junobuild/core-peer";
import { Login } from "./Login";
import { Logout } from "./Logout";

export const AuthContext = createContext<{user: User | null}>({user: null});

export const Auth = ({ children }: {children: React.ReactElement[] | React.ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const sub = authSubscribe((user) => setUser(user));

    return () => sub();
  }, []);

  useEffect(() => {
    console.log(user)

  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>
      {user !== undefined && user !== null ? (
        <div>
          {children}

          <Logout />
        </div>
      ) : (
        <Login />
      )}
    </AuthContext.Provider>
  );
};
