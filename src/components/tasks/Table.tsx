import { useContext, useEffect, useState } from "react";
import { Doc, listDocs } from "@junobuild/core-peer";
import { AuthContext } from "@/components/auth/Auth";
import { ITask } from "@/config/constants";
import ChallengeCreateModal from "@/components/modals/ChallengeCreateModal";
import Box from "../layouts/Box";
import { Login } from "../auth/Login";
import { TableItem } from "./TableItem";

export const Table = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState<Doc<ITask>[]>([]);

  useEffect(() => {
    window.addEventListener("reload", list);

    return () => {
      window.removeEventListener("reload", list);
    };
  }, []);

  const list = async () => {
    const { items } = await listDocs<ITask>({
      collection: "tasks",
      filter: {
        order: {
          desc: true,
          field: 'created_at'
        },
        owner: user?.key || 'hjucn-tqcmv-so34n-uhk5k-aytjd-rn2cu-fqyar-byulg-ta2x7-7bdk6-qqe'
      },
    });

    setItems(items);
  };

  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }

    (async () => await list())();
  }, [user]);

  const renderTableItem = ({ key, data, created_at, updated_at }: Doc<ITask>) => {
    return <TableItem key={key} item={data} createdAt={created_at} updatedAt={updated_at} />
  }

  return (
    <Box className="w-full max-w-2xl mx-auto shadow-lg mt-8">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800 text-4xl">Dare.to XYZ</h2>
      </header>
      <div className="py-3">
        <div className="overflow-x-auto">
          {!items.length ? <div className="py-8">
            <h1 className="text-9xl py-4">🧗‍♂️</h1>
            <span className="text-xl text-stone-900">Create a challenge, step out of comfort zone!</span>
          </div> : null}
          <div className="max-h-[320px] overflow-y-auto">
            {items.map(renderTableItem)}
          </div>
        </div>
      </div>
      {!user ? <div className="flex flex-col items-center"><Login /></div> : <ChallengeCreateModal />}
      
    </Box>
  );
};
