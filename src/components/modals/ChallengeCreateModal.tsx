import { Button, ModalBody, ModalFooter, ModalHeader, Tooltip, Link } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react"
import ModalBase from "@/components/layouts/ModalBase"
import { AuthContext } from "../auth/Auth"
import { setDoc } from "@junobuild/core-peer";
import { ITask } from "@/config/constants";


export const ChallengeCreateModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)
  const [title, setTitle] = useState("")
  const [deadline, setDeadline] = useState(+new Date() + 24*60*60*1000)
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setValid(title !== "" && deadline > +new Date() && user !== undefined && user !== null);
  }, [showModal, title, user]);

  const reload = () => {
    let event = new Event("reload");
    window.dispatchEvent(event);
  };

  const add = async () => {
    // Demo purpose therefore edge case not properly handled
    if (!user) {
      return;
    }

    setLoading(true);

    try {
      // let url;

      // if (file !== undefined) {
      //   const filename = `${user?.key || 'unknown'}-${+new Date()}`;

      //   const { downloadUrl } = await uploadFile({
      //     collection: "images",
      //     data: file,
      //     filename,
      //   });

      //   url = downloadUrl;
      // }

      const key = `${user.key}-${+new Date()}`;

      await setDoc<ITask>({
        collection: "tasks",
        doc: {
          key,
          data: {
            title: title,
            status: 'pending',
            proofUrl: '',
            userId: user.key,
            keyId: key,
            completionTimestamp: 0,
            deadlineTimestamp: deadline
          },
        },
      });

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
        <h3 className="text-center text-white/50 font-bold">Dare to Challenge!</h3>
        <span className={'w-full text-3xl font-bold text-center bg-gradient-to-t from-slate-700 via-zinc-500 to-slate-400 text-transparent bg-clip-text animate-text'}>
          
        </span>
      </ModalHeader>
      <ModalBody>
        <div className="py-16">
          <h3 className="text-center text-white/50 font-bold">Dare to Challenge!</h3>
          {/* <h1 className="text-white font-bold text-center text-6xl py-2 ">#{validatorIndex}</h1>
          <h3 className="text-center text-white/50 font-bold"><Tooltip placement="bottom" color="default" content={`${pubkey}`}><Link isExternal href={`${chain?.blockExplorers?.beaconchain?.url}/validator/${pubkey}`} target="_blank" rel="noopener">{truncate(pubkey, 10)}</Link></Tooltip></h3> */}
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