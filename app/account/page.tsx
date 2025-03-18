'use client'
import CunstomButton from "@/components/CustomButton";
import CustomLayout from "@/components/CustomLayout";
import { getUserStats, logout } from "../_lib/data";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import FormResetPassword from "@/components/FormResetPassword";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Account() {

  const router = useRouter();

  async function handleLogout() {
    const token = localStorage.getItem('token')
    const data = await logout(token || '');
    if (data[0].logout_user === 'SUCCESS: Logged out') {
      localStorage.removeItem('token')
      router.push('/auth')
    } else alert(data[0].logout_user)
  }

  type UserStats = {
    total_games: number,
    wins: number
  }

  const [showResetModal, setShowResetModal] = useState(false)
  const [user, setUser] = useState<UserStats | null>(null)

  useEffect(() => {
      const token = localStorage.getItem('token')
      
      async function fetchData() {
        const userData = await getUserStats(token || '');
        console.log(userData)
        // const gameId = JSON.stringify(response);
        if (userData[0].get_user_stats.error) {
          alert(`Ошибка. ${userData[0].get_user_info.error}`)
          return
        }
        setUser(userData[0].get_user_stats)
      }
  
      fetchData(); // Initial fetch
    }, [])

  return(
    <Suspense>
      <CustomLayout>
        {user ? <>
          <h2 className="mb-4 text-2xl font-bold text-center">ПРОЦЕНТ ПОБЕД</h2>
          <h3 className="mb-7 text-9xl font-bold text-center">{Math.round((user.wins / user.total_games) * 100) || 0}</h3>
        </> : <LoadingSpinner/>}
        <div className="flex justify-between md:flex-row flex-col md:gap-5 md:mx-auto md:justify-center">
          <CunstomButton className="px-4 py-2 text-xs mb-6 md:h-16" onClickFunc={() => handleLogout()}>Выйти</CunstomButton>
          <CunstomButton className="px-4 py-2 text-xs mb-2 md:h-16" onClickFunc={() => setShowResetModal(true)}>Сброс пароля</CunstomButton>
        </div>
      </CustomLayout>
      <Modal showModal={showResetModal} showModalFunc={setShowResetModal}>
        <FormResetPassword/>
      </Modal>
    </Suspense>
  )
}