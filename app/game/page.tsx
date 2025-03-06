'use client'

import { useState, useEffect } from "react";
import CustomLayout from "@/components/CustomLayout";
import GameBoard from "@/components/GameBoard";
import { getData, registerUser, login } from "../_lib/data";
import GameHelp from "@/components/GameHelp";
import Score from "@/components/Score";

export default function Game() {
  const [token1, setToken1] = useState<any[]>([]);
  const [token2, setToken2] = useState<any[]>([]);

  const [login1, setLogin1] = useState<any[]>([]);
  const [login2, setLogin2] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      const data = await registerUser('client1@test', 'password1');
      if (isMounted) {
        setToken1(data || []);
      }

      const data2 = await registerUser('client2@test', 'password2');
      if (isMounted) {
        setToken2(data2 || []);
      }

      const data3 = await login('client1@test', 'password1');
      if (isMounted) {
        setLogin1(data3 || []);
      }

      const data4 = await login('client2@test', 'password2');
      if (isMounted) {
        setLogin2(data4 || []);
      }
    }

    fetchData(); // Initial fetch
    // const interval = setInterval(fetchData, 5000);

    return () => {
      isMounted = false;
      // clearInterval(interval);
    };
  }, []);

  return (
    <CustomLayout className="flex justify-center items-center overflow-hidden">
      <div>{JSON.stringify(token1)}</div>
      <div>{JSON.stringify(token2)}</div>
      <div>{JSON.stringify(login1)}</div>
      <div>{JSON.stringify(login2)}</div>

      <Score />
      <GameBoard />
      <GameHelp />
    </CustomLayout>
  );
}