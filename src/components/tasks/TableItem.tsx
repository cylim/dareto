import { ITask } from "@/config/constants"
import Contracts from "@/contracts";
import { setDoc, uploadFile } from "@junobuild/core-peer";
import { useContext, useEffect, useState } from "react";
import { encodeFunctionData } from 'viem';
import { AuthContext } from "../auth/Auth";
import toast from "react-hot-toast";
import ExternalIcon from '@/assets/icons/external.svg'
import { Button, Input } from "@nextui-org/react";
import { charities } from "@/config/charities";


export const TableItem = ({ item, createdAt, updatedAt }: { item: ITask, createdAt: bigint | undefined, updatedAt: bigint | undefined }) => {
  const [loading, setLoading] = useState(false)
  const { user, provider } = useContext(AuthContext)
  const [file, setFile] = useState<File | undefined>();

  const reload = () => {
    let event = new Event("reload");
    window.dispatchEvent(event);
  };

  const getCharityName = (address: string) => {
    return charities.find(c => c.walletAddress === address)
  }

  const handleSubmitProof = async () => {
    setLoading(true);

    try {
      if (!provider || !user) {
        throw new Error('No user or provider')
      }
      if (file !== undefined) {
        const filename = `${item.keyId || 'unknown'}-${+new Date()}`;

        toast(`Uploading proof`)
        const { downloadUrl } = await uploadFile({
          collection: "images",
          data: file,
          filename,
        });

        toast(`Updating Challenge Task`)
        const callData = encodeFunctionData({
          abi: Contracts.sepolia.challenge.abi,
          functionName: "complete",
          args: [item.keyId],
        });

        const { hash } = await provider.sendUserOperation({
          target: Contracts.sepolia.challenge.address,
          data: callData,
        }
        // {paymasterAndData: "0x"}
        );
        console.log('hash', hash)

        const txHash = await provider.waitForUserOperationTransaction(hash);
        console.log('txHash', txHash)

        await setDoc<ITask>({
          collection: "tasks",
          doc: {
            key: item.keyId,
            created_at: createdAt,
            updated_at: updatedAt,
            data: {
              ...item,
              status: 'completed',
              completionTimestamp: +new Date(),
              proofUrl: downloadUrl,
              txHash: txHash
            },
          },
        });
        toast(`Done: ${txHash}`)

        reload()
        let event = new Event("reloadUser");
        window.dispatchEvent(event);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  const handleSurrender = async () => {
    setLoading(true)
    try {
      if (!provider || !user) {
        throw new Error('No user or provider')
      }

      toast(`Updating Challenge Task`)
      const callData = encodeFunctionData({
        abi: Contracts.sepolia.challenge.abi,
        functionName: "forfeit",
        args: [item.keyId],
      });

      const { hash } = await provider.sendUserOperation({
        target: Contracts.sepolia.challenge.address,
        data: callData,
      });

      const txHash = await provider.waitForUserOperationTransaction(hash);
      console.log(txHash)

      await setDoc<ITask>({
        collection: "tasks",
        doc: {
          key: item.keyId,
          created_at: createdAt,
          updated_at: updatedAt,
          data: {
            ...item,
            status: 'failed',
            completionTimestamp: +new Date(),
            txHash: txHash
          },
        },
      });
      toast(`Done: ${txHash}`)

      reload()
      let event = new Event("reloadFund");
      window.dispatchEvent(event);
      let event2 = new Event("reloadUser");
      window.dispatchEvent(event2);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return <div className="flex flex-col gap-4 py-2 pb-6">
    <div className={'flex flex-row justify-between flex-wrap items-center line-clamp-3 text-left w-full'}>
      <div className="font-semibold text-2xl grow flex flex-row items-start gap-1">
        {item.status === 'failed' ? '🔴 ' : null}{item.status === 'completed' ? '✅ ' : null}{item.title}
        {item.status === 'completed' && !!item.proofUrl ? (
          <a
            aria-label="Open data"
            rel="noopener noreferrer"
            href={item.proofUrl}
            target="_blank"
            className="pl-1"
          >
            <ExternalIcon />
          </a>
        ) : undefined}
      </div>
      <div className="font-medium text-base flex flex-col grow items-end">
        <div >
          {new Date(item.deadlineTimestamp).toLocaleDateString()}
        </div>
        <div className="font-normal text-sm flex flex-row gap-1">
          {getCharityName(item.donationAddress)?.title}
          <div className="font-normal text-sm">({item.amount} ETH)</div>
        </div>
      </div>

    </div>
    
    {item.status === 'pending' ? (
      <div className={'flex flex-row flex-wrap justify-center gap-2'}>
        <Input
          key={`${item.keyId}-input`}
          id={`${item.keyId}-input`}
          name={`${item.keyId}-input`}
          type="file"
          className="mx-4"
          onChange={(e) => setFile(e.target.files?.[0] || undefined)}
          disabled={loading}
          accept="image/*"
        />
        <Button radius="full" onClick={handleSubmitProof} isLoading={loading} color={'primary'} className="w-[280px]">Submit Proof</Button>
        <Button radius="full" onClick={handleSurrender} isLoading={loading} color={'danger'} className="w-[280px]">Abandon</Button>
      </div>
    ) : undefined}
  </div>
}