import { signOut } from "@junobuild/core-peer";
import { Button } from "@nextui-org/react";
import SignOutIcon from '@/assets/icons/SignOut.svg'
import { useLocalStorage } from "usehooks-ts";

export const Logout = () => {
  const [userId, setUserId] = useLocalStorage('id:userid', "")


  const logout = () => {
    setUserId("")
    signOut()

  }
  return (
    <Button
      type="button"
      onClick={logout}
      className="rounded-md px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600"
    >
      <div className="flex items-center justify-center gap-1.5">
        <SignOutIcon />
        Logout
      </div>
    </Button>
  );
};
