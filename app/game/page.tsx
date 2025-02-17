"use client"
import CustomLayout from '@/components/CustomLayout';
import GameBoard from '@/components/GameBoard';

export default function Game() {

  return (
    <>
      <CustomLayout className='flex justify-center items-center overflow-hidden'>
        <GameBoard/>
      </CustomLayout>
    </>
  );
}
