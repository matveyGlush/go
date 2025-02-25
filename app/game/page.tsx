'use client'

import { useState, useEffect } from "react";
import CustomLayout from "@/components/CustomLayout";
import GameBoard from "@/components/GameBoard";
import { getData } from "../_lib/data";
import GameHelp from "@/components/GameHelp";

export default function Game() {
  const [dataUsers, setDataUsers] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      const data = await getData();
      if (isMounted) {
        setDataUsers(data || []);
      }
    }

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Fetch every 10 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <CustomLayout className="flex justify-center items-center overflow-hidden">
      <div>{JSON.stringify(dataUsers)}</div>
      <GameBoard />
      <GameHelp />
    </CustomLayout>
  );
}