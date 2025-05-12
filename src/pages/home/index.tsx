import { useTranslation } from '@refinedev/core';
import Header from './Components/Header';

export const Home = () => {
      const {translate: t} = useTranslation()
  return (
    <>
     {/* <Header /> */}
     <div className='h-[70vh] bg-blue1 w-full flex items-center justify-center'>
               <h1 className='text-[4rem] text-white font-bold'>
                    {t("common.welcome")}
               </h1>
     </div>
    </>
  )
}