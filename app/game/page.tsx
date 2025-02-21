import CustomLayout from '@/components/CustomLayout';
import GameBoard from '@/components/GameBoard';
import { getData } from '../_lib/data';

export default async function Game() {

  let dataUsers

  try {
    dataUsers = await getData()
    console.log(dataUsers)
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }


  return (
    <CustomLayout className='flex justify-center items-center overflow-hidden'>
      <div>{JSON.stringify(dataUsers)}</div>
      <GameBoard />
    </CustomLayout>
  );
}
