import React, { createContext, useEffect, useState } from "react";
import { User, authSubscribe } from "@junobuild/core-peer";

export const AuthContext = createContext<{user: User | null}>({user: null});

export const Auth = ({ children }: {children: React.ReactElement[] | React.ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = authSubscribe((user) => setUser(user));

    return () => unsub();
  }, []);

  useEffect(() => {
    console.log(user)

  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
