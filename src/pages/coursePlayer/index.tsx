import { Button, Layout, Progress, Segmented, Typography } from 'antd';
import { CaretRightOutlined, ExpandOutlined, SoundOutlined, SettingOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import ReactPlayer from 'react-player';
import { useList, useOne } from '@refinedev/core';
import { Link, useParams } from 'react-router-dom';
import { VideoPlayer } from '@/components/VideoPlayer';

declare global {
  interface Window {
    Playerjs: any;
  }
}
const {Sider} = Layout;
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
  const [currentLesson, setCurrentLesson] = useState(null);
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
    resource:"lessons",
    id:currentLesson,
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
    label: (
      <div className="flex items-center">
        <div className="flex-1">{lesson.title}</div>
        {/* <div className="mr-4 text-gray-400">{lesson.id}.</div> */}
      </div>
    ),
  }

));
  return (
      <div className="h-screen flex gap-4 pl-2 overflow-hidden">

        <div className="flex-1 flex flex-col py-8 px-4 ">
          <div className="relative flex-1">
            {!vidLoading ? 
           <VideoPlayer url={currentVideo}/>
           :null}
          </div>
              <div className="bg-[#ddd] h-fit p-4 rounded-lg w-full">
                {lesson?.data?.description}
              </div>
        </div>
        <Sider 
          width={384} 
        style={{backgroundColor:"#ddd"}}
        
        >
          {/* Course title */}
          <div className="p-4 border-b ">
            <Link to={`/course/${id}`}>
            <div className="flex items-center mb-4">
              <LeftOutlined className="h-4 w-4" />
              <span className="mr-2">Back to course</span>
            </div>
            </Link>
            <Typography.Title level={4} style={{ textAlign: 'right' }}>
              {lesson?.data?.title}
            </Typography.Title>
            {/* <Progress 
              percent={progress}
              strokeColor="#3B82F6"
              trailColor="#374151"
              showInfo={false}
              className="mt-4"
            /> */}
          </div>

          {/* <Segmented
            block
            options={[
              { label: 'مسار', value: 'path' },
              { label: 'قائمة', value: 'list' }
            ]}
            style={{ 
              margin: '16px',
            }}
          /> */}


          <Menu
            // mode="inline"
            selectedKeys={[currentLesson?.toString()]}
            items={menuItems}
          />
        </Sider>
      </div>
  );
};


