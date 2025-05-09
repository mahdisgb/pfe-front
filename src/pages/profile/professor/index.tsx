import Sider from '@/components/Sider'
import React, { useState } from 'react'
import SideBar from './Sidebar'
import { useCreate, useGetIdentity, useList } from '@refinedev/core';
import { Upload, Button, message, Card, UploadProps, Table, TableColumnType } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export const ProfessorProfile = () => {
  const [activePage, setActivePage] = useState('content');
  const [activeTab, setActiveTab] = useState('videos');
  const {data:user}=useGetIdentity<any>();
  const {mutate :uploadVideo } =useCreate();
  const {data:courses} = useList({
    resource:"courses/professor/",
    pagination:{
      mode:"client"
    },
    filters:[{
      field:"professorId",
      operator:"eq",
      value:user?.id
    }]
  })
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleBeforeUpload = (file:any) => {
    if (!file.type.startsWith('video/')) {
      message.error('Only video files are allowed!');
      return false;
    }

    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file)); // Preview locally
    return false; // Prevent auto upload
  };

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', 'My Lesson Title');
    formData.append('description', 'Lesson description');
    formData.append('courseId', '7'); // set this dynamically
    formData.append('professorId', user?.id); // set this dynamically
    // formData.append('order', '1');
    // formData.append('difficulty', 'beginner');
    // formData.append('thumbnail', thumbnailFile); // if you have one
    // tags.forEach(tag => formData.append('tags[]', tag));
    // prerequisites.forEach(id => formData.append('prerequisites[]', id));

    uploadVideo(
      {
        resource: 'lessons',
        values: formData,
        meta: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      },
      {
        onSuccess: () => {
          message.success('Upload successful!');
          if (onSuccess) onSuccess();
        },
        onError: () => {
          message.error('Upload failed.');
          if (onError) onError();
        },
      }
    );
  };

  const props: UploadProps = {
    // name: 'file',
    multiple: false,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    accept: 'video/*',
    customRequest: handleUpload,
  };
  const columns:TableColumnType<any>[] = [
    {
      title: '-',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Lessons Count',
      dataIndex: 'lessonCount',
      key: 'lessonCount',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
    },
    
    
  ];
  return (
  <div className='bg-[#f7f7f7] flex w-full' style={{height:"90vh",}}>
    <SideBar/>
    <Table
    dataSource={courses?.data}
    columns={columns}
    show
    />

    {/* {activePage !== 'content' && (
          <div className="h-full flex items-center justify-center">
            <p className="text-xl text-youtube-text">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)} page would be displayed here
            </p>
          </div>
        )} */}
        <div className=' w-full flex items-center justify-center'>
        <div className="flex flex-col gap-4">
          <Card 
          style={{
            // width:"500px",
            // height:"500px",
            display:"flex"
            ,alignItems:"center",
            justifyContent:"center"
          }}
          styles={{body:{
            padding:0
          }}}>
          
      <Dragger height={300} {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
      </Card>
    </div>
        </div>
  </div>
  )
}


/*import { Card, Tabs, List, Avatar, Tag, Button } from 'antd';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
import { useGo } from '@refinedev/core';
import { useState } from 'react';

import { 
  LayoutDashboard, 
  Video, 
  BarChart2, 
  Users, 
  FileText, 
  Copyright, 
  DollarSign, 
  Paintbrush, 
  Music, 
  Settings, 
  MessageSquare, 
  Filter, SortDesc, ArrowDown,
  HelpCircle,
  Search
} from 'lucide-react';

export const ProfessorProfile = () => {
  const user = JSON.parse(localStorage.getItem("refine_user")!);
  const go = useGo();
  const [activePage, setActivePage] = useState('content');
  const [activeTab, setActiveTab] = useState('videos');
  return (
    <div className="flex flex-col h-screen bg-youtube-dark">
    <Header />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-auto">
        {activePage === 'content' && (
          <>
            <ChannelHeader 
              name="Your channel" 
              username="elmahdi"
              avatarUrl="https://i.pravatar.cc/150?img=36"
            />
            <h2 className="text-2xl font-bold text-white px-6 py-4">Channel content</h2>
            <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <EmptyState onUpload={()=>{}} />
          </>
        )}
        
        {activePage !== 'content' && (
          <div className="h-full flex items-center justify-center">
            <p className="text-xl text-youtube-text">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)} page would be displayed here
            </p>
          </div>
        )}
      </main>
    </div>
  </div>
  );
}; 

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <button
      className={"flex items-center gap-4 w-full py-3 px-6 text-left hover:bg-youtube-hover"}
        // active && "bg-youtube-hover`}
      onClick={onClick}
    >
      <Icon size={20} className={active ? "text-white" : "text-youtube-text"} />
      <span className={"text-sm font-medium" + active ? "text-white" : "text-youtube-text"}>
        {label}
      </span>
    </button>
  );
};

type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Video, label: "Content", id: "content" },
    { icon: BarChart2, label: "Analytics", id: "analytics" },
    { icon: Users, label: "Community", id: "community" },
    { icon: FileText, label: "Subtitles", id: "subtitles" },
    { icon: Copyright, label: "Copyright", id: "copyright" },
    { icon: DollarSign, label: "Earn", id: "earn" },
    { icon: Paintbrush, label: "Customisation", id: "customisation" },
    { icon: Music, label: "Audio library", id: "audio-library" },
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings", id: "settings" },
    { icon: MessageSquare, label: "Send feedback", id: "feedback" },
  ];

  return (
    <div className="w-64 h-full bg-[#bbb] flex flex-col border-r border-youtube-hover">
      <div className="flex-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activePage === item.id}
            onClick={() => setActivePage(item.id)}
          />
        ))}
      </div>
      <div className="border-t border-youtube-hover">
        {bottomItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activePage === item.id}
            onClick={() => setActivePage(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
type ChannelHeaderProps = {
  name: string;
  username: string;
  avatarUrl: string;
};

const ChannelHeader = ({ name, username, avatarUrl }: ChannelHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-youtube-hover">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-700 mr-6">
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-medium text-white">{name}</h1>
          <p className="text-sm text-youtube-text">{username}</p>
        </div>
      </div>
    </div>
  );
};



type TabProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const Tab = ({ label, active, onClick }: TabProps) => {
  return (
    <button
      className={
        "px-4 py-3 text-youtube-text font-medium text-sm border-b-2 border-transparent hover:text-white" +
        active && "text-white border-white"
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
};

type ContentTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const ContentTabs = ({ activeTab, setActiveTab }: ContentTabsProps) => {
  const tabs = [
    { label: "Inspiration", id: "inspiration" },
    { label: "Videos", id: "videos" },
    { label: "Shorts", id: "shorts" },
    { label: "Live", id: "live" },
    { label: "Posts", id: "posts" },
    { label: "Playlists", id: "playlists" },
    { label: "Podcasts", id: "podcasts" },
    { label: "Promotions", id: "promotions" },
  ];
  
  return (
    <div className="bg-youtube-dark border-b border-youtube-hover">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between px-6 py-3">
        <button className="flex items-center gap-2 text-youtube-text hover:text-white">
          <Filter size={18} />
          <span className="text-sm">Filter</span>
        </button>
        <div className="grid grid-cols-6 w-3/4 text-sm font-medium">
          <div className="text-center text-youtube-text">Video</div>
          <div className="text-center text-youtube-text">Visibility</div>
          <div className="text-center text-youtube-text">Restrictions</div>
          <div className="flex items-center justify-center text-youtube-text">
            <span>Date</span>
            <SortDesc size={14} className="ml-1" />
          </div>
          <div className="text-center text-youtube-text">Views</div>
          <div className="text-center text-youtube-text">Comments</div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ onUpload }: any) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-[#f7f7f7]">
      <div className="w-40 h-40 mb-4">
        <img 
          src="/lovable-uploads/d31dc024-394b-49ba-ae90-9189a614f89f.png" 
          alt="No content" 
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-youtube-text mb-6">No content available</p>
      <button 
        onClick={onUpload}
        className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
      >
        Upload videos
      </button>
    </div>
  );
};


const Header = () => {
  return (
    <header className="h-16 bg-youtube-dark border-b border-youtube-hover flex items-center justify-between px-6">
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-youtube-red rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </div>
          <span className="text-white font-bold ml-2">Studio</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search across your channel"
            className="w-full bg-youtube-darker border border-youtube-hover rounded-full py-2 pl-10 pr-4 text-white placeholder-youtube-text focus:outline-none focus:ring-1 focus:ring-youtube-blue"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-youtube-text" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-youtube-text hover:text-white">
          <HelpCircle size={20} />
        </button>
        <button className="bg-youtube-blue text-white px-4 py-2 rounded-sm font-medium text-sm">
          Create
        </button>
        <div className="w-8 h-8 bg-blue-500 rounded-full overflow-hidden">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};*/


/**
 * <div className="p-4">
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <Avatar size={64} icon={<UserOutlined />} />
          <div>
            <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-gray-500">Professor</p>
            <div className="mt-2">
              <Tag color="blue">Computer Science</Tag>
              <Tag color="green">Mathematics</Tag>
            </div>
          </div>
        </div>

        <Tabs
          items={[
            {
              key: '1',
              label: 'My Courses',
              children: (
                <div>
                  <Button 
                    type="primary" 
                    className="mb-4"
                    onClick={() => go({ to: "/courses/create" })}
                  >
                    Create New Course
                  </Button>
                  <List
                    itemLayout="horizontal"
                    dataSource={[]} // TODO: Add professor's courses data
                    renderItem={(item: any) => (
                      <List.Item
                        actions={[
                          <Button 
                            key="edit" 
                            onClick={() => go({ to: `/courses/edit/${item.id}` })}
                          >
                            Edit
                          </Button>,
                          <Button key="delete" danger>Delete</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<BookOutlined />}
                          title={item.title}
                          description={`${item.studentsCount} students enrolled`}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              ),
            },
            {
              key: '2',
              label: 'Statistics',
              children: (
                <div>
                  <Card.Grid style={{ width: '50%' }}>
                    <h3>Total Students</h3>
                    <p className="text-2xl">0</p>
                  </Card.Grid>
                  <Card.Grid style={{ width: '50%' }}>
                    <h3>Total Courses</h3>
                    <p className="text-2xl">0</p>
                  </Card.Grid>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
 */