'use client'
import CunstomButton from "@/components/CustomButton";
import CustomLayout from "@/components/CustomLayout";

export default function Account() {
  const nickname = 'glushkoMat'
  const rating = Math.floor(34 / 124 * 100) + '%'

  return(
    <CustomLayout>
      <h2 className="mb-7 font-bold">ПРОЦЕНТ ПОБЕД: {rating}</h2>
      <form className="mb-14">
        <label htmlFor="nickname">
          Изменить игровое имя:
          <input id="nickname" className="font-bold px-2 py-1 bg-slate-950 text-white rounded-md" defaultValue={nickname}/>
        </label>
        <CunstomButton className="px-2 py-1 ml-2 h-fit" theme="dark">Подтвердить</CunstomButton>
      </form>
      <div className="flex justify-between">
        <CunstomButton className="px-4 py-2 bg-red-800 text-white">Удалить аккаунт</CunstomButton>
        <CunstomButton className="px-4 py-2">Выйти</CunstomButton>
      </div>
    </CustomLayout>
  )
}