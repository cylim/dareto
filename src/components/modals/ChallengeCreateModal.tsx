import { Button, ModalBody, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react"
import ModalBase from "@/components/layouts/ModalBase"
import { AuthContext, chain, selectedNetwork } from "../auth/Auth"
import { setDoc } from "@junobuild/core-peer";
import { ITask } from "@/config/constants";
import { Input } from "@nextui-org/react";
import { charities } from "@/config/charities";
import { parseEther, encodeFunctionData } from 'viem';
import Contracts from "@/contracts";
import toast from "react-hot-toast";

export const ChallengeCreateModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)
  const [title, setTitle] = useState("")
  const [donationAddress, setDonationAddress] = useState<any>(new Set([]))
  const [amount, setAmount] = useState("")
  const [deadline, setDeadline] = useState<any>(new Date(+new Date() + 24 * 60 * 60 * 1000))
  const { user, address, provider } = useContext(AuthContext);

  useEffect(() => {
    const [dAddr] = donationAddress
    setValid(
      !!title
      && +new Date(deadline) > +new Date() 
      && user !== null
      && +amount >= 0.001
      && !!dAddr 
    );
  }, [title, user, donationAddress, deadline, amount]);

  const reload = () => {
    let event = new Event("reload");
    window.dispatchEvent(event);
  };

  const add = async () => {
    setLoading(true);

    try {
      if (!provider || !user) {
        throw new Error('No user or provider')
      }
      
      const key = `${user.key}-${+new Date()}`;
      const [dAddr] = donationAddress

      const callData = encodeFunctionData({
        abi: Contracts[selectedNetwork].challenge.abi,
        functionName: "create",
        args: [key, dAddr, BigInt(+new Date(deadline) / 1000)],
      });

      toast('Creating challenge task...')
      await setDoc<ITask>({
        collection: "tasks",
        doc: {
          key,
          data: {
            keyId: key,
            userId: user.key,
            userAddress: address || '', 
            title: title,
            status: 'pending',
            amount: amount || '0',
            donationAddress: dAddr,
            deadlineTimestamp: +new Date(deadline),
            completionTimestamp: 0,
            proofUrl: '',
          },
        },
      });

      toast('pledging token for completion...',{duration: 10000})
      const { hash } = await provider.sendUserOperation({
        target: Contracts[selectedNetwork].challenge.address,
        data: callData,
        value: parseEther(amount) 
      });

      const txHash = await provider.waitForUserOperationTransaction(hash);
      console.log(txHash)
      toast(`Created: ${txHash}`)

      setShowModal(false);
      reload();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  if (!user) {
    return null
  }
  const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`

  return <>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <Button
        onClick={() => setShowModal(true)}
        className="primary-button"
      >
        Add Challenge
      </Button>
    </div>
    <ModalBase isOpen={showModal} onOpenChange={setShowModal}>
      <ModalHeader className="flex flex-col" >
        <h3 className="text-center text-xl text-white/50 font-bold">Dare.to Challenge!</h3>
      </ModalHeader>
      <ModalBody>
        <div className="py-16 flex flex-col gap-4">
          <Input variant={'faded'}  label="Title" placeholder="What is your challenge about?" isRequired value={title} onValueChange={setTitle} />
          <Input variant={'faded'} label="Deadline" placeholder="When you should finish it?" type="date" isRequired min={currentDate} value={deadline} onValueChange={setDeadline} />
          <Input variant={'faded'}  label="Staked Amount" placeholder="If not finished on time, how much will you donate?" type="number" min={0.001} step={0.001} isRequired value={amount} onValueChange={setAmount} endContent={
            <span>{chain.nativeCurrency.symbol}</span>
          } />
          <Select
            variant={'faded'} 
            label="Staked to"
            placeholder="select an organization to donate if failed"
            isRequired selectedKeys={donationAddress} onSelectionChange={setDonationAddress}
          >
            {charities.map((c) => (
              <SelectItem key={c.walletAddress} value={c.walletAddress} textValue={c.title}>
                  <p>{c.title}</p>
                  <p>{c.walletAddress}</p>
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="modal-terms">
          <Button radius="full" onClick={add} isLoading={loading} isDisabled={!valid} color="primary" className="primary-button">
            Create
          </Button>
          <Button radius="full" onClick={() => setShowModal(false)} className="primary-button bg-none !animate-none !transition-none !bg-[#272727] !mt-4">Cancel</Button>
        </div>
      </ModalBody>
      <ModalFooter className="flex flex-col text-center w-full">
        <h2>What Happens?</h2>
        <p className="terms-conditions">Donation to charity if failed to complete on time.</p>
        <p className="terms-conditions">Complete the challenge within deadline to earn some points!</p>
      </ModalFooter>
    </ModalBase>
  </>
}

export default ChallengeCreateModal