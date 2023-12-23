import { signOut } from "@junobuild/core-peer";
import { Button } from "@nextui-org/react";
import SignOutIcon from '@/assets/icons/SignOut.svg'

export const Logout = () => {
  return (
    <Button
      type="button"
      onClick={signOut}
      className="rounded-md px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600"
    >
      <div className="flex items-center justify-center gap-1.5">
        <SignOutIcon />
        Logout
      </div>
    </Button>
  );
};
