import { useContext, useEffect, useState } from "react";
import Box from "./layouts/Box"
import { AuthContext } from "./auth/Auth";
import { formatAddress } from "@/utils/strings";
import CopyIcon from '@/assets/icons/copy.svg'
import { publicClient } from "@/config/viem";
import { formatEther } from 'viem'
import Contracts from "@/contracts";

const BalanceCard = ({ token, address, contract }: { token: string, address: `0x${string}`, contract?: typeof Contracts.sepolia.fulToken }) => {

  const [amount, setAmount] = useState(BigInt(0))

  useEffect(() => {
    window.addEventListener("reloadUser", update);

    return () => {
      window.removeEventListener("reloadUser", update);
    };
  }, []);

  const update = async () => {
    if (!publicClient) { return }

    let bal = BigInt(0)
    if (!!contract) {
      const data = await publicClient.readContract({
        ...contract,
        functionName: 'balanceOf',
        args: [address]
      })
      bal = data
    } else {
      bal = await publicClient.getBalance({ address })
    }
    setAmount(bal)
  }

  useEffect(() => {
    update()
  }, [publicClient, address, contract])

  return <div
    className={`md:w-[200px] w-full`}
  >
    <section className={`transition-opacity duration-1000 overflow-hidden text w-full h-full`}>
      <span className={'font-medium text-4xl tracking-tight leading-normal text-center'}>{formatEther(amount)} <span className={'font-medium text-lg tracking-tight leading-normal text-center'}>{token}</span></span>
    </section>
  </div>
}

export const UserDetail = () => {
  const { address } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);

  if (!address) { return null }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return <Box className="w-full max-w-2xl mx-auto shadow-lg mt-8 card-black">
    <header className="px-5 py-2 border-b border-gray-100 cursor-pointer" onClick={handleCopy}>
      <h2 className="font-semibold text-4xl">{formatAddress(address || '')}
        <span className={'text-xs font-normal pl-2'}>{copied ? '(copied)' : <CopyIcon className={'inline-block'} />}</span>
      </h2>
    </header>
    <div className="flex flex-row flex-wrap items-center justify-center w-full gap-5 pt-8 pb-2">
      <BalanceCard token={'ETH'} address={address} />
      <BalanceCard token={'FUL'} address={address} contract={Contracts.sepolia.fulToken} />
    </div>
    <div className={'pt-4'}>
      <p>Sepolia testnet</p>
    </div>
  </Box>
}