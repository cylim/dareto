"use client";

import { useEffect } from "react";
import { initJuno } from "@junobuild/core-peer";
import { Auth } from "@/components/Auth";
import { Table } from "@/components/Table";
import { Modal } from "@/components/Modal";
import { SATELITE_ID } from "@/config/env";

export default function Home() {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: SATELITE_ID,
      }))();
  }, []);

  return (
    <Auth>
      <div className="isolate bg-white min-h-screen">
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl pt-16">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Sample Juno App
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  A sample app build with React, Tailwind and{" "}
                  <a
                    href="https://juno.build"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="underline"
                  >
                    Juno
                  </a>
                  .
                </p>
                <Table />
                <Modal />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Auth>
  );
}
