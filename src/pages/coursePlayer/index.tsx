import { Avatar, Button, Input, Layout, List, Progress, Segmented, Typography } from 'antd';
import { CaretRightOutlined, ExpandOutlined, SoundOutlined, SettingOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import ReactPlayer from 'react-player';
import { useCreate, useGetIdentity, useList, useOne, useTranslation } from '@refinedev/core';
import { Link, useParams } from 'react-router-dom';
import { VideoPlayer } from '@/components/VideoPlayer';
import Header from '@/components/Header';
import { Download } from 'lucide-react';

declare global {
  interface Window {
    Playerjs: any;
  }
}
const {Sider} = Layout;
export const Coursereplay = () => {
  const { translate: t } = useTranslation();
  
  return (
    <div className="relative w-full aspect-video bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <img 
            src="/lovable-uploads/aeaef32e-8be8-40c3-95d7-f04777f72ffc.png" 
            alt={t('coursePlayer.courseContent')} 
            className="max-w-md mx-auto rounded-lg shadow-lg" 
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <Button type="text" icon={<CaretRightOutlined />} className="text-white" />
            <span>{t('coursePlayer.timeProgress')}</span>
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

const CourseSidebar = () => {
  const { translate: t } = useTranslation();
  
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: t('coursePlayer.introduction'),
      children: [{
        key: "20",
        label: t('coursePlayer.why')
      }]
    },
    {
      key: '2',
      label: t('coursePlayer.unit1'),
    },
    {
      key: '3',
      label: t('coursePlayer.unit2'),
    },
    {
      key: '4',
      label: t('coursePlayer.unit3'),
    },
    {
      key: '5',
      label: t('coursePlayer.unit4'),
    },
    {
      key: '6',
      label: t('coursePlayer.unit5'),
    },
    {
      key: '7',
      label: t('coursePlayer.unit6'),
    },
    {
      key: '8',
      label: t('coursePlayer.unit7'),
    },
    {
      key: '9',
      label: t('coursePlayer.unit8'),
    },
    {
      key: '10',
      label: t('coursePlayer.unit9'),
    },
  ];

  return (
    <div className="w-80 h-screen bg-[#2d1b69] text-white overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold">{t('coursePlayer.title')}</h2>
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
  const [comment,setComment]=useState("")
  const { translate: t } = useTranslation();
  const [currentLesson, setCurrentLesson] = useState<any>();
  const [progress, setProgress] = useState(77);
  const [currentVideo, setCurrentVideo] = useState("");
  const { id } = useParams();
  const{mutateAsync:createComment}=useCreate()
  const {data:user}=useGetIdentity<any>()
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
  const {data:comments,refetch}=useList({
    resource:`comments/lesson/${currentLesson}`,
    pagination:{
      mode:"off"
    }
  })
console.log(comments)
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
  const menuItems : any= lessons?.data.map((lesson) => ({
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

const handleDownload =async  () => {
  if (!currentVideo || !lesson?.data?.title) return;
 const type = await fetch(currentVideo, { method: "HEAD" })
  .then(r =>r.headers.get("Content-Type"))
  const a = document.createElement('a');
  a.href = currentVideo; 
  a.download = `${lesson.data.title}.${type}`; 
  a.style.display = 'none';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
const handleAddComment = async ()=>{
  try {
    await createComment({
      resource:"comments",
      values:{
        userId:user?.id, 
        content :comment,
         lessonId:currentLesson,
        //  courseId:id
      }
    })
    setComment("")
    refetch()
  } catch (error) {
    
  }
}
  return (
      <div className="min-h-screen flex flex-col">
      <Header />
<div className='relative flex'>
        <div className="flex-1 flex flex-col items-between px-4 py-4 lg:h-[150vh]">
          <div className="flex-1">
            <div className="relative">
            {!vidLoading ? 
           <VideoPlayer url={currentVideo}/>
           :null}
           </div>
          </div>
          <div className='flex items-center justify-between bg-[#eee] p-4 rounded-lg '>
              <div className="h-fit w-full">
                {lesson?.data?.description}
              </div>
              <Button
              type='link'
              icon={<Download />}
              onClick={handleDownload}
              />

          </div>
          <div className=" bg-[#eee] rounded-lg ">
            <Typography.Title level={4}>Comments</Typography.Title>
            <List
              itemLayout="horizontal"
              dataSource={comments?.data} 
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                    title={<a href="#">{item.user.firstName} {item.user.lastName}</a>}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
            <div className="mt-4">
              <Input.TextArea onChange={(e)=>e.target.value && setComment(e.target.value)} value={comment} rows={4} placeholder="Add a comment..." />
              <Button onClick={handleAddComment} type="primary" className="mt-2">
                Post Comment
              </Button>
            </div>
          </div>
        </div>
        <Sider 
          width={384} 
        style={{backgroundColor:"#eee",
          height:"100%",
          minHeight:"100vh",
          padding:"0",
          margin:"0"
        }}
        >
          <div className="p-4 border-b">
            <Link to={`/course/${id}`}>
            <div className="flex items-center mb-4">
              <LeftOutlined className="h-4 w-4" />
              <span className="mr-2">{t('coursePlayer.backToCourse')}</span>
            </div>
            </Link>
            <Typography.Title level={4} style={{ textAlign: 'right' }}>
              {lesson?.data?.title}
            </Typography.Title>
          </div>

          <Menu
            // mode="inline"
            selectedKeys={[currentLesson?.toString()]}
            items={menuItems}
          />
        </Sider>

</div>

      </div>
  );
};

export default CourseSidebar;


