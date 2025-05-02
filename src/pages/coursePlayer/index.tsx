import { Button, Layout, Progress, Segmented, Typography } from 'antd';
import { CaretRightOutlined, ExpandOutlined, SoundOutlined, SettingOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import ReactPlayer from 'react-player';
import { useList, useOne } from '@refinedev/core';
import { useParams } from 'react-router-dom';
import { VideoPlayer } from '@/components/VideoPlayer';

declare global {
  interface Window {
    Playerjs: any;
  }
}

export const Coursereplay = () => {
  return (
    <div className="relative w-full aspect-video bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <img src="/lovable-uploads/aeaef32e-8be8-40c3-95d7-f04777f72ffc.png" 
               alt="Course content" 
               className="max-w-md mx-auto rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <Button type="text" icon={<CaretRightOutlined />} className="text-white" />
            <span>00:00 / 00:00</span>
          </div>
          <div className="flex items-center gap-4">
            <Button type="text" icon={<SoundOutlined />} className="text-white" />
            <Button type="text" icon={<SettingOutlined />} className="text-white" />
            <Button type="text" icon={<ExpandOutlined />} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};


const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'المقدمة',
    children:[{
        key:"20",
        label:"whuy"
    }]
  },
  {
    key: '2',
    label: 'الوحدة: العملية',
  },
  {
    key: '3',
    label: 'الوحدة : التجارة الالكترونية',
  },
  {
    key: '4',
    label: 'الوحدة : المتاجر الالكترونية',
  },
  {
    key: '5',
    label: 'الوحدة : خبايا البحث عن منتجات',
  },
  {
    key: '6',
    label: 'الوحدة: ابدأ في تحقيق الارباح في دول الخليج',
  },
  {
    key: '7',
    label: 'الوحدة : ادارة المخزون',
  },
  {
    key: '8',
    label: 'الوحدة: اساسيات اعلانات الفايسبول',
  },
  {
    key: '9',
    label: 'الوحدة: التسويق والبيع',
  },
  {
    key: '10',
    label: 'الوحدة : مؤشرات الأداء الرئيسية للدفع (COD KPIs) عند التسليم',
  },
];

const CourseSidebar = () => {
  return (
    <div className="w-80 h-screen bg-[#2d1b69] text-white overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold">المفيد في التجارة الالكترونية - 100% مجانا</h2>
      </div>
      <Menu
        mode="inline"
        theme="dark"
        items={items}
        className="bg-transparent border-r-0"
        style={{ direction: 'rtl' }}
      />
    </div>
  );
};


export const CoursePlayer = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState(77);
  const[currentVideo,setCurrentVideo]=useState("");
  const { id } = useParams();

  const {data:lessons,isFetched:lessonsFetched} = useList({
    resource:"lessons/course/",
    pagination:{
      mode:"client"
    },
    filters:[{
      field:"courseId",
      operator:"eq",
      value:id,
    }]
  })
  useEffect(()=>{
    if(lessonsFetched && lessons){
      setCurrentLesson(lessons?.data[0]?.id)
    }
  },[lessons])
  const {data: lesson,isLoading:vidLoading}=useOne({
    resource:"lessons/",
    id:currentLesson
  })
  useEffect(()=>{
    if(lesson){
      setCurrentVideo(lesson?.data?.videoUrl)
    }
  },[currentLesson])
 

  // const lessons = [
  //   { id: 1, title: "المقدمة" },
  //   { id: 2, title: "الوحدة: العملية" },
  //   { id: 3, title: "الوحدة : التجارة الإلكترونية" },
  //   { id: 4, title: "الوحدة : المتاجر الإلكترونية" },
  //   { id: 5, title: "الوحدة : خبايا البحث عن منتجات" },
  //   { id: 6, title: "الوحدة: ابدأ في تحقيق الارباح في دول الخليج" },
  //   { id: 7, title: "الوحدة : إدارة المخزون" },
  //   { id: 8, title: "الوحدة: أساسيات اعلانات الفيسبوك" },
  //   { id: 9, title: "الوحدة: التسويق والبيع" },
  //   { id: 10, title: "الوحدة : مؤشرات الأداء الرئيسية للدفع (COD KPIs) عند التسليم" }
  // ];
  const menuItems : MenuProps['items']= lessons?.data.map((lesson) => ({
    key: lesson.id,
    onClick: () => setCurrentLesson(lesson.id),
    style: {
      textAlign: 'right', 
      margin: 0,
      borderBottom: '1px solid #374151'
    },
    label: (
      <div className="flex items-center">
        <div className="flex-1 text-right">{lesson.title}</div>
        <div className="mr-4 text-gray-400">{lesson.id}.</div>
      </div>
    ),
    children:[
        {
            key:"aa",
            label:"why"
        }
    ]
  }

));
  return (
    // <div className="flex min-h-screen bg-gray-100">
    //   <CourseSidebar />
    //   <div className="flex-1">
    //     <div className="max-w-6xl mx-auto p-6">
    //       <Coursereplay/>
    //     </div>
    //   </div>
    // </div>

  
  
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header with tabs */}
      {/* <div className="bg-gray-900 px-4 py-2 border-b border-gray-700 flex items-center">
        <div className="flex items-center space-x-2 mr-4">
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        </div>
        <div className="flex-1 px-2 text-xs text-gray-400 truncate">
          lmofidclub.com/path-player?courseid=start&unit=...
        </div>
        <div className="flex items-center space-x-2">
          <button className="w-6 h-6 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs">
            23
          </button>
        </div>
      </div> */}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <Layout.Sider 
          width={384} 
          theme="dark" 
          style={{ background: '#111827', borderRight: '1px solid #374151' }}
        >
          {/* Course title */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center text-gray-400 mb-4">
              <LeftOutlined className="h-4 w-4" />
              <span className="mr-2">العودة الى صفحة الدورة</span>
            </div>
            <Typography.Title level={4} style={{ color: '#fff', textAlign: 'right' }}>
              المفيد في التجارة الالكترونية - 100% مجانا
            </Typography.Title>
            <Progress 
              percent={progress}
              strokeColor="#3B82F6"
              trailColor="#374151"
              showInfo={false}
              className="mt-4"
            />
          </div>

          {/* Course navigation */}
          <Segmented
            block
            options={[
              { label: 'مسار', value: 'path' },
              { label: 'قائمة', value: 'list' }
            ]}
            style={{ 
              margin: '16px',
              backgroundColor: '#1F2937'
            }}
          />

          {/* Lessons list */}
         

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentLesson?.toString()]}
            style={{ background: '#111827' }}
            items={menuItems}
          />
        </Layout.Sider>

        {/* Main content area */}
        <div className="flex-1 flex flex-col bg-black">
          {/* Video navigation */}
          <div className="flex justify-between items-center p-4 bg-gray-900 text-gray-400">
            <div>الفيديو الموالي</div>
            <div>الفيديو الذي قبل</div>
          </div>

          {/* Video content */}
          <div className="flex-1 relative">
            {/* Video player */}
            {!vidLoading ? 
           <VideoPlayer url={currentVideo}/>
           :null}
            {/* Instructor video overlay */}
          </div>

          {/* Video controls */}
           {/* <div className="bg-gray-900 p-2 flex items-center">
            <button className="text-gray-400 hover:text-white mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="flex-1 mx-4 relative h-1 bg-gray-700 rounded-full">
              <div className="absolute top-0 left-0 h-1 bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
              <div className="absolute top-0 left-0 h-4 w-4 bg-white rounded-full -mt-1.5" style={{ left: '30%' }}></div>
            </div>
            <div className="text-gray-400 mx-2 text-xs">00:00 / 00:00</div>
            <button className="text-gray-400 hover:text-white mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.897-7.898m-3.813 0a9 9 0 000 12.728" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>  */}
        </div>
      </div>
    </div>
  );
};


