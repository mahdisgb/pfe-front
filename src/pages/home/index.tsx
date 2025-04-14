import { useTranslation } from 'react-i18next';
import Header from './Components/Header';

export const Home = () => {
    
  return (
    <>
     {/* <Header /> */}
     <div className='h-[70vh] bg-blue1 w-full flex items-center justify-center'>
               <h1 className='text-[4rem] text-white font-bold'>
                    Welcome to Wajihani
               </h1>
     </div>
    </>
  )
}