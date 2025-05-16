import { 
  Users, 
  Clock, 
  BookOpen, 
  MessageSquare, 
  Download, 
  Send,
  ArrowLeft
} from "lucide-react";

export const CoursePage = () => {
  return (
    <CourseDetail />
  )
}
import { 
  Layout, 
  Typography, 
  Card, 
  Avatar, 
  Badge, 
  Space, 
  Button, 
  Input, 
  Tabs, 
  Collapse, 
  List, 
  Tag, 
  Divider,
  message
} from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  BookOutlined,
  MessageOutlined,
  DownloadOutlined,
  SendOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useGetIdentity, useList, useOne, useTranslation } from "@refinedev/core";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Content } = Layout;
const { TabPane } = Tabs;
const { Panel } = Collapse;

export const CourseDetail = () => {
  const { translate: t } = useTranslation();
  const{data:user}=useGetIdentity<any>()
  const { id } = useParams();
  const{data:isEnrolled}=useOne({
    resource:`course-subscriptions/check`,
    id:`${user?.id}/${id}`
  })
  const {data:course} = useOne({
    resource:"courses",
    id:id
  })
  const navigate = useNavigate()
  const {data:lessons} = useList({
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
  // const {data:professor} = useOne({
  //   resource:"auth/user",
  //   id:course?.data?.professor.id
  // })
  const [messageText, setMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [messageApi, contextHolder] = message.useMessage();
 
  console.log(isEnrolled)
  if (!course) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Title level={3}>{t('course.notFound.title')}</Title>
        <Paragraph className="mb-6">{t('course.notFound.description')}</Paragraph>
        <Link to="/courses">
          <Button icon={<ArrowLeftOutlined />}>
            {t('common.backToCourses')}
          </Button>
        </Link>
      </div>
    );
  }


  const handleDownload = (materialName: string) => {
    messageApi.success(t('course.download.success'));
  };

  return (
    <div className="bg-white xl:w-[70vw] lg:w-[77vw] md:w-[85vw] w-[95vw] mx-auto">
      {contextHolder}
      {/* Hero Section with Course Image and basic info */}
      <div className="relative h-[300px] md:h-[400px] mb-8 rounded-b-lg overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={course?.data?.thumbnail} 
            alt={course?.data?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <Link to="/courses" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeftOutlined className="mr-2" />
            {t('common.backToCourses')}
          </Link>
          <Space className="flex justify-between items-center">
            <Title level={1} style={{color:"white"}}>{course?.data?.title}</Title>
            {isEnrolled?.data.hasAccess ? null:
            <Button
            size="large"
            type="primary"
            onClick={()=>navigate(`/enrollment/${course?.data?.id}`)}>
              {t('common.enroll')}
            </Button>}
          </Space>
        </div>
      </div>

      <Content className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2">
            {/* Course? Description */}
            <div className="mb-8">
              <Title level={3}>{t('course.aboutCourse')}</Title>
              <Paragraph style={{fontSize:"16px"}} className="text-gray-600">{course?.data?.description}</Paragraph>
            </div>

            {/* Course? Lessons */}
            <div className="mb-8">
              <Title level={3}>Course Content</Title>
              
              <Collapse accordion className="w-full bg-white" >
                 {lessons?.data?.map((lesson:any, index:any) => (
                   <Panel 
                    key={lesson.id} 
                    header={
                      <div className="font-medium">
                        {index + 1}. {lesson.title}
                      </div>
                    }
                    style={{backgroundColor:"#f9f9f9"}}
                    >
                      {isEnrolled?.data.hasAccess || user?.roles.includes("admin") || lesson.professorId === user?.id ?
                        <Link to={ `/courseplayer/${course.data.id}`}>
                    <Paragraph className="text-gray-600 mb-2">{lesson.description}</Paragraph>
                    <div className="flex items-center justify-between">
                      <Tag color="blue" className="flex items-center">
                        <ClockCircleOutlined className="mr-1" />
                        {dayjs(lesson.duration * 1000).format("HH:mm:ss")}
                      </Tag>
                    </div>
                    </Link>
                    :
                    <Paragraph className="text-gray-600 mb-2">{lesson.description}</Paragraph>
                  }
                  </Panel>
                ))} 
              </Collapse>
              
            </div>

            {/* FAQs */}
            {/* <div className="mb-8">
              <Title level={3}>Frequently Asked Questions</Title>
              <Collapse accordion className="w-full bg-white">
               {course?.faqs.map((faq:any, index:any) => (
                  <Panel 
                    key={`faq-${index}`} 
                    header={faq.question}
                  >
                    <Paragraph className="text-gray-600">{faq.answer}</Paragraph>
                  </Panel>
                ))} 
              </Collapse>
            </div> */}
          </div>

          {/* Sidebar - Right 1/3 */}
          <div>
            {/* Professor Card */}
            <Card className="mb-6">
              <div className="flex items-center space-x-4">
              <UserOutlined style={{fontSize:"30px"}} />
                <div>
                  <Title level={5} className="!mb-0">{course?.data?.professor?.firstName} {course?.data?.professor?.name}</Title>
                  {/* <Text type="secondary">{course?.professor.name}</Text> */}
                </div>
              </div>
              {/* <Paragraph className="text-gray-600">{course?.professor.bio}</Paragraph> */}
            </Card>

            {/* Tabs for Chat and Materials */}
            <Card>
              <Tabs defaultActiveKey="chat">
                <TabPane 
                  tab={
                    <span>
                      <MessageOutlined />
                      Chat with Professor
                    </span>
                  } 
                  key="chat"
                >
                  <Title level={4}>Ask a Question</Title>
                  <Paragraph type="secondary">
                    {/* Send a message to {course?.professor.name} */}
                  </Paragraph>
                  <div className="space-y-4">
                    {/* Chat Messages Area */}
                    <div 
                      ref={chatRef}
                      className="h-[200px] p-4 bg-gray-100 rounded-md overflow-auto"
                    >
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                          No messages yet. Ask a question to get started.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {chatMessages.map((msg, i) => (
                            <div 
                              key={i} 
                              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                  msg.sender === "You" 
                                    ? "bg-blue-500 text-white" 
                                    : "bg-gray-200"
                                }`}
                              >
                                <p className="text-xs font-medium mb-1">{msg.sender}</p>
                                <p className="text-sm">{msg.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="flex items-end gap-2">
                      <TextArea 
                        placeholder="Type your message here..." 
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onPressEnter={(e) => {
                          if (!e.shiftKey) {
                            e.preventDefault();
                          }
                        }}
                      />
                      <Button 
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined />}
                      />
                    </div>
                  </div>
                </TabPane>
                
                <TabPane 
                  tab={
                    <span>
                      <DownloadOutlined />
                      Materials
                    </span>
                  } 
                  key="materials"
                >
                  <Title level={4}>Course? Materials</Title>
                  <Paragraph type="secondary">
                    Download resources for this course?
                  </Paragraph>
                  <List
                    // dataSource={course?.materials}
                    renderItem={(material:any) => (
                      <List.Item>
                        <Button 
                          type="default" 
                          icon={<DownloadOutlined />}
                          block
                          onClick={() => handleDownload(material.name as any)}
                        >
                          {material.name}
                        </Button>
                      </List.Item>
                    )}
                  />
                  <Divider />
                  <Text type="secondary" className="text-xs">
                    All materials are available for enrolled students
                  </Text>
                </TabPane>
              </Tabs>
            </Card>
          </div>
        </div>
      </Content>
    </div>
  );
};

