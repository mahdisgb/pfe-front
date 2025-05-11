import { Button, Input, Dropdown, Menu, Spin } from 'antd'
import React, { useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { useGetIdentity, useGo, useList, useLogout } from '@refinedev/core';
import { SearchProps } from 'antd/es/input';
import { UserOutlined } from '@ant-design/icons';

interface Course {
    id: number;
    title: string;
    thumbnail?: string;
    category?: {
        name: string;
    };
}

interface Lesson {
    id: number;
    title: string;
    thumbnailUrl?: string;
    course?: {
        title: string;
    };
}

interface SearchResult {
    courses: Course[];
    lessons: Lesson[];
}

const Header = () => {
     const go = useGo();
     const { mutate: logout } = useLogout();
     const user = JSON.parse(localStorage.getItem("refine_user")!);
     const { Search } = Input;
     const [search, setSearch] = useState("");
     const [dropdownVisible, setDropdownVisible] = useState(false);
     const { data: results, isLoading } = useList<SearchResult>({
          resource: "search",
          queryOptions: {
               enabled: !!search,
          },
          pagination: {
               mode: "off",
          },
          filters: [
               {
                    field: "query",
                    operator: "eq",
                    value: search,
               },
          ],
     });

     const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
          setDropdownVisible(true);
     }

     const handleResultClick = (type: 'course' | 'lesson', id: number) => {
          setDropdownVisible(false);
          setSearch('');
          if (type === 'course') {
               go({ to: `/courses/${id}` });
          } else {
               go({ to: `/lessons/${id}` });
          }
     }

     const searchMenu = (
          <Menu style={{ maxHeight: '400px', overflow: 'auto' }}>
               {isLoading ? (
                    <Menu.Item key="loading">
                         <div className="flex justify-center p-2">
                              <Spin size="small" />
                         </div>
                    </Menu.Item>
               ) : !results?.data.courses?.length && !results?.data.lessons?.length ? (
                    <Menu.Item key="no-results">
                         <div className="p-2 text-gray-500">No results found</div>
                    </Menu.Item>
               ) : (
                    <>
                         {results?.data.courses?.length > 0 && (
                              <Menu.ItemGroup title="Courses">
                                   {results.data.courses.map((course: Course) => (
                                        <Menu.Item 
                                             key={`course-${course.id}`}
                                             onClick={() => handleResultClick('course', course.id)}
                                        >
                                             <div className="flex items-center gap-2">
                                                  {course.thumbnail && (
                                                       <img 
                                                            src={course.thumbnail} 
                                                            alt={course.title}
                                                            className="w-8 h-8 object-cover rounded"
                                                       />
                                                  )}
                                                  <div>
                                                       <div className="font-medium">{course.title}</div>
                                                       <div className="text-xs text-gray-500">
                                                            {course.category?.name}
                                                       </div>
                                                  </div>
                                             </div>
                                        </Menu.Item>
                                   ))}
                              </Menu.ItemGroup>
                         )}
                         {results?.data.lessons?.length > 0 && (
                              <Menu.ItemGroup title="Lessons">
                                   {results.data.lessons.map((lesson: Lesson) => (
                                        <Menu.Item 
                                             key={`lesson-${lesson.id}`}
                                             onClick={() => handleResultClick('lesson', lesson.id)}
                                        >
                                             <div className="flex items-center gap-2">
                                                  {lesson.thumbnailUrl && (
                                                       <img 
                                                            src={lesson.thumbnailUrl} 
                                                            alt={lesson.title}
                                                            className="w-8 h-8 object-cover rounded"
                                                       />
                                                  )}
                                                  <div>
                                                       <div className="font-medium">{lesson.title}</div>
                                                       <div className="text-xs text-gray-500">
                                                            {lesson.course?.title}
                                                       </div>
                                                  </div>
                                             </div>
                                        </Menu.Item>
                                   ))}
                              </Menu.ItemGroup>
                         )}
                    </>
               )}
          </Menu>
     );

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
                         <Dropdown 
                              overlay={searchMenu} 
                              open={dropdownVisible && !!search}
                              onOpenChange={setDropdownVisible}
                              trigger={['click']}
                         >
                              <Input
                                   value={search}
                                   placeholder="Search courses and lessons..."
                                   allowClear
                                   onChange={handleSearch}
                                   style={{ width: 304 }}
                              />
                         </Dropdown>
                         {user ? (
                              <Link to={`/profile/courses`}>
                                   <UserOutlined style={{ fontSize: '24px', color: 'white' }} />
                              </Link>
                         ) : null}
                         {!user ?
                              <Button onClick={() => go({ to: "/login" })}>
                                   Register now
                              </Button> : null}
                         {user ? (
                              <Button onClick={() => logout()}>
                                   Logout
                              </Button>
                         ) : null}
                    </div>
               </nav>
          </header>
     )
}

export default Header