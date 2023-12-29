import React, { createContext, useEffect, useState } from "react";
import { User, authSubscribe, unsafeIdentity } from "@junobuild/core-peer";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LocalAccountSigner, type Hex } from "@alchemy/aa-core";
import { sepolia, optimismSepolia, baseSepolia, polygonMumbai } from "viem/chains";
import { ALCHEMY_AA_GAS_POLICY_ID, ALCHEMY_API_KEY, CHALLENGER_CANISTER_HOST, CHALLENGER_CANISTER_ID } from "@/config/env";
import { toHex } from 'viem'
import { useLocalStorage } from "usehooks-ts";
import { SupportedNetworks } from "@/contracts";
import { createActor, motoko_backend as Challenger } from '@/../motoko/src/declarations/motoko_backend';
import { HttpAgent } from "@dfinity/agent";

// const opSepolia = {
//   ...optimismSepolia, rpcUrls: {
//     ...optimismSepolia.rpcUrls,
//     alchemy: {
//       http: ["https://opt-sepolia.g.alchemy.com/v2"],
//       webSocket: ["wss://opt-sepolia.g.alchemy.com/v2"]
//     }
//   }
// }
// const bSep = {
//   ...baseSepolia, rpcUrls: {
//     ...baseSepolia.rpcUrls,
//     alchemy: {
//       http: ["https://base-sepolia.g.alchemy.com/v2"],
//       webSocket: ["wss://base-sepolia.g.alchemy.com/v2"]
//     }
//   }
// }

export const chain = polygonMumbai;

export const selectedNetwork = chain.network as SupportedNetworks

interface IAuthContext { 
  user: User | null, 
  provider: AlchemyProvider | null 
  address: `0x${string}` | null
  challenger: any | null
}

export const AuthContext = createContext<IAuthContext>({ 
  user: null, 
  provider: null,
  address: null,
  challenger: null,
});

export const Auth = ({ children }: {children: React.ReactElement[] | React.ReactElement }) => {
  const [userId, setUserId] = useLocalStorage('id:userid', "")
  const [address, setAddress] = useState<`0x${string}` | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [challenger, setChallenger] = useState<any | null>(null);
  const [provider, setProvider] = useState<AlchemyProvider | null>(null)
  useEffect(() => {
    const unsub = authSubscribe((user) => setUser(user));

    return () => unsub();
  }, []);

  useEffect(() => {
    if(!user?.key) { 
      setUser(null)
      setProvider(null)
      setAddress(null)
      setChallenger(null)
      return 
    }

    // https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=ule7a-cqaaa-aaaak-qcx4a-cai
    const agent = new HttpAgent({ identity: unsafeIdentity(), host: CHALLENGER_CANISTER_HOST });
    const challenger = createActor(CHALLENGER_CANISTER_ID, { agent })
    setChallenger(challenger)
    setUserId(user.key)
    const PRIVATE_KEY = toHex((user.key).slice(0,30), {size: 32}) as Hex;
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
    provider.withAlchemyGasManager({
      policyId: ALCHEMY_AA_GAS_POLICY_ID,
    });

    setProvider(provider);

    (async () => {
      const addr = await provider.getAddress()
      console.log("Smart Account Address: ", addr);
      setAddress(addr)
    })();

  }, [user])

  return (
    <AuthContext.Provider value={{ user, provider, address, challenger }}>
      {children}
    </AuthContext.Provider>
  );
};
