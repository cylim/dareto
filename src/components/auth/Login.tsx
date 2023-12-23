import { signIn } from "@junobuild/core-peer";
import SignInIcon from "@/assets/icons/SignIn.svg"
import { Button } from "@nextui-org/react";

export const Login = () => {
  return (
      <Button
        type="button"
        onClick={async () => await signIn()}
        className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <div className="flex items-center justify-center gap-1.5">
          <SignInIcon />
          Sign In
        </div>
      </Button>
  );
};
