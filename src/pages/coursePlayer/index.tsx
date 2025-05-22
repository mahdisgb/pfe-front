import Header from '@/components/Header';
import { VideoPlayer } from '@/components/VideoPlayer';
import { CaretRightOutlined, ExpandOutlined, LeftOutlined, SettingOutlined, SoundOutlined } from '@ant-design/icons';
import { useCreate, useGetIdentity, useList, useTranslation } from '@refinedev/core';
import type { MenuProps } from 'antd';
import { Avatar, Button, Input, Layout, List, Menu, Typography } from 'antd';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
  const[lessonsList,setLessonsList]=useState<any[]>([])
  const[lesson,setLesson]=useState<any>()
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
      setLessonsList(lessons?.data)
      setLesson(lessons?.data[0])
      setCurrentLesson(lessons?.data[0]?.id)
    }
  },[lessons])
  // const {data: lesson,isLoading:vidLoading}=useOne({
  //   resource:"lessons",
  //   id:currentLesson,
  // })
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


  const menuItems : any= lessons?.data.map((lesson) => ({
    key: lesson.id,
    onClick: () => setLesson(lesson),
    label: (
      <div className="flex items-center">
        <div className="flex-1">{lesson.title}</div>
        {/* <div className="mr-4 text-gray-400">{lesson.id}.</div> */}
      </div>
    ),
  }

));

const handleDownload =async  () => {
  if (!lesson || !lesson?.title) return;
 const type = await fetch(lesson?.videoUrl, { method: "HEAD" })
  .then(r =>r.headers.get("Content-Type"))
  // const extension = type?.split("/")[1] || "mp4";
  // console.log(extension)
  // console.log(type)
  // const response = await fetch(lesson.videoUrl);
  // const blob = await response.blob();
  // const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = lesson?.videoUrl; 
  // a.href = blobUrl; 
  a.download = `${lesson.title}.mp4`; 
  a.style.display = 'none';
  // a.target="_blank"
  a.rel = 'noreferrer';

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
         lessonId:lesson?.id,
        //  courseId:id
      }
    })
    setComment("")
    refetch()
  } catch (error) {
    
  }
}
  return (
      <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header />
<div className='relative flex'>
            {/* <CloudinaryVidPlayer id="player" publicId={"pus3p33msbszba16oimz"}/> */}
        <div className="flex-1 flex flex-col items-between ">
          <div>
            {lesson ? 
           <video src={lesson?.videoUrl} style={{minHeight:"500px",minWidth:"800px"}} width={"100%"} height={"100%"} preload='auto' controls/>
           :<video/>}
          </div>
          <div className='flex items-center justify-between bg-[#eee] p-4'>
        
              <div className="h-fit w-full">
                {lesson?.title} <br /><br />
                {lesson?.description}
              </div>
              <Button
              size='large'
              // type='link'
              style={{backgroundColor:"#1e55a9",color:"white",width:"100px"}}
              icon={<Download />}
              onClick={handleDownload}
              />

          </div>
          <div className=" bg-[#eee] rounded-lg p-4">
            <Typography.Title level={4}>{t('coursePlayer.comments')}</Typography.Title>
            <List
              itemLayout="horizontal"
              dataSource={comments?.data} 
              style={{maxHeight:"50vh",overflowY:"auto"}}
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
              <Input.TextArea onChange={(e)=>e.target.value && setComment(e.target.value)} value={comment} rows={4} placeholder={t('coursePlayer.addComment')} />
              <Button onClick={handleAddComment} type="primary" className="mt-2">
                {t('coursePlayer.postComment')}
              </Button>
            </div>
          </div>
        </div>
        <Sider 
          width={384} 
        style={{backgroundColor:"#1e55a9",
          height:"100%",
          // minHeight:"100vh",
          paddingBottom:"20px",
          margin:"0"
        }}
        >
          <div className="p-4">
            <Link to={`/course/${id}`}>
            <div className="flex items-center mb-4">
              <LeftOutlined className="h-4 w-4" />
              <span className="mr-2 text-white">{t('coursePlayer.backToCourse')}</span>
            </div>
            </Link>
            <Typography.Title level={4} style={{ textAlign: 'right',color:"white" }}>
              {lesson?.title}
            </Typography.Title>
          </div>

          <Menu
            // mode="inline"
            style={{backgroundColor:"inherit",border:"none"}}
            selectedKeys={[lesson?.id?.toString()]}
            items={menuItems} 
          />
        </Sider>

</div>

      </div>
  );
};

export default CourseSidebar;


