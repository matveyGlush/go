'use client'

import { useEffect, useState } from "react";
import { isTokenValid } from "./data";

type AuthState = 'in' | 'out' | 'fetching';

export const useAuthToken = () => {
  const [isAuth, setIsAuth] = useState<AuthState>('out');

  useEffect(() => {
    setIsAuth('fetching')

    const storedToken = localStorage.getItem("token");

    async function checkToken(tokenToCheck: string) {
      const result = await isTokenValid(tokenToCheck)    
      console.log(result)

      if(result[0].verify_token) setIsAuth('in')
      else setIsAuth('out')
    }

    if (storedToken) checkToken(storedToken)
    else setIsAuth('out')
  }, []);

  return isAuth;
};