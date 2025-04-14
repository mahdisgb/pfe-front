import { Button, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetIdentity, useGo, useLogout } from '@refinedev/core';
import { SearchProps } from 'antd/es/input';
import { UserOutlined } from '@ant-design/icons';

const Header = () => {
     const go = useGo();
     const { mutate: logout } = useLogout();
     const loggedin = localStorage.getItem("refine_user");
     const { Search } = Input;
     const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

     return (
          <header>
               <nav className="flex h-[65px] bg-[#bbb] justify-around items-center">
                    <div className='flex items-center gap-3'>
                         <div className="logo">
                              <Link to="#">
                                   <img className="w-[45px] rounded-full" src="/logo.jpeg" alt="Wajihni" />
                              </Link>
                         </div>
                         <ul className="flex gap-2">
                              <li className='hover:text-[#f8f8f8] underline'><Link to="/">Home</Link></li>
                              <li className='hover:text-[#f8f8f8] underline'><Link to="/courses">Courses</Link></li>
                              <li className='hover:text-[#f8f8f8] underline'><Link to="#">Our services</Link></li>
                         </ul>
                    </div>
                    <div className='flex items-center gap-3'>
                         <Search
                              placeholder="input search text"
                              allowClear
                              onSearch={onSearch}
                              style={{ width: 304 }}
                         />
                         <UserOutlined style={{ fontSize: '24px', color: 'white' }} />
                         {!loggedin ?
                              <Button onClick={() => go({ to: "/login" })}>
                                   Register now
                              </Button> : null}
                         <Button onClick={() => logout()}>
                              logout
                         </Button>

                    </div>
               </nav>
          </header>
     )
}

export default Header