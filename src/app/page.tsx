"use client";

import { useEffect } from "react";
import { initJuno } from "@junobuild/core-peer";
import { Auth } from "@/components/auth/Auth";
import { Table } from "@/components/tasks/Table";
import { SATELITE_ID } from "@/config/env";
import redpandaImg from '@/assets/images/redpanda.jpg';
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { GeneralStats } from "@/components/stats/GeneralStats";
import { UserDetail } from "@/components/UserDetail";

export default function Home() {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: SATELITE_ID,
      }))();
  }, []);

  return (
    <Auth>
      <div className="min-h-screen background overflow-y-auto bg-cover bg-center bg-[#00000090] bg-blend-hue overflow-x-hidden" style={{ backgroundImage: `url(${redpandaImg.src})` }}>
        <Header/>
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl pt-10">
              <div className="text-center">
                <Table />
                <UserDetail />
                <GeneralStats />
              </div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </Auth>
  );
}
