import React, { createContext, useEffect, useState } from "react";
import { User, authSubscribe } from "@junobuild/core-peer";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LocalAccountSigner, type Hex } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";
import { ALCHEMY_API_KEY } from "@/config/env";
import { toHex } from 'viem'

const chain = sepolia;

interface IAuthContext { 
  user: User | null, 
  provider: AlchemyProvider | null 
  address: `0x${string}` | null
}

export const AuthContext = createContext<IAuthContext>({ 
  user: null, 
  provider: null,
  address: null,
});

export const Auth = ({ children }: {children: React.ReactElement[] | React.ReactElement }) => {
  const [address, setAddress] = useState<`0x${string}` | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [provider, setProvider] = useState<AlchemyProvider | null>(null)
  useEffect(() => {
    const unsub = authSubscribe((user) => setUser(user));

    return () => unsub();
  }, []);

  useEffect(() => {
    if(!user) { 
      setProvider(null)
      setAddress(null)
      return 
    }
    const PRIVATE_KEY = toHex((user?.key || '0x').slice(0,30), {size: 32}) as Hex;
    const owner = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);

    const provider = new AlchemyProvider({
      apiKey: ALCHEMY_API_KEY,
      chain,
    }).connect(
      (rpcClient) =>
        new LightSmartContractAccount({
          rpcClient,
          owner,
          chain,
          factoryAddress: getDefaultLightAccountFactoryAddress(chain),
        })
    )
    setProvider(provider);

    (async () => {
      const addr = await provider.getAddress()
      console.log("Smart Account Address: ", addr);
      setAddress(addr)
    })();

  }, [user])

  return (
    <AuthContext.Provider value={{ user, provider, address }}>
      {children}
    </AuthContext.Provider>
  );
};
