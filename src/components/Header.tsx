import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetIdentity, useGo, useLogout } from '@refinedev/core';

const Header = () => {
    const go =useGo();
    const {mutate:logout}=useLogout();
    const loggedin = localStorage.getItem("refine_user");
  return (
    <header>
    <nav className="flex h-[65px] bg-[#bbb] justify-around items-center">
          <div className="logo">
               <Link to="#">
                    <img src="imgs/logo_fb.png" alt="Info March" />
               </Link>
          </div>
        
          <ul className="flex gap-2">
               <li className='hover:text-[#f8f8f8] underline'><Link to="/">Home</Link></li>
               <li className='hover:text-[#f8f8f8] underline'><Link to="/courses">Courses</Link></li>
               <li className='hover:text-[#f8f8f8] underline'><Link to="#">Our services</Link></li>
          </ul>
          <div>
          {!loggedin ? 
          <Button onClick={()=>go({to:"/login"})}>
               Register now
          </Button>: null}
          <Button onClick={()=>logout()}>
               logout
          </Button>
          </div>
     </nav>
    </header>
  )
}

export default Header