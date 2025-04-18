import React from 'react'
import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
// import { getCourseById } from "@/data/coursesData";
// // import { Button } from "@/components/ui/button";
// import { 
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { 
//   Card, 
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// // } from "@/components/ui/card";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useToast } from "@/components/ui/use-toast";
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
import { useOne } from '@refinedev/core';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Content } = Layout;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const CourseDetail = () => {
  const { id } = useParams();
  const {data:course}= useOne({
    resource:"courses",
    id:id
  })
  // const course = getCourseById(id || "");
  const [messageText, setMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [messageApi, contextHolder] = message.useMessage();

  if (!course) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Title level={2}>Course not found</Title>
        <Paragraph className="mb-6">The course you're looking for doesn't exist or has been removed.</Paragraph>
        <Link to="/courses">
          <Button icon={<ArrowLeftOutlined />}>
            Back to Courses
          </Button>
        </Link>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { sender: "You", text: messageText }]);
    setMessageText("");
    
    // Simulate professor response after a delay
    // setTimeout(() => {
    //   setChatMessages(prev => [
    //     ...prev, 
    //     { 
    //       sender: course.professor.name, 
    //       text: `Thanks for your question! I'll get back to you soon.` 
    //     }
    //   ]);
      
    //   // Scroll to bottom of chat
    //   if (chatRef.current) {
    //     chatRef.current.scrollTop = chatRef.current.scrollHeight;
    //   }
    // }, 1000);
  };

  const handleDownload = (materialName: string) => {
    messageApi.success(`${materialName} is being downloaded.`);
  };

  return (
    <Layout className="bg-white">
      {contextHolder}
      {/* Hero Section with Course Image and basic info */}
      <div className="relative h-[300px] md:h-[400px] mb-8 rounded-b-lg overflow-hidden">
        <div className="absolute inset-0">
          {/* <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <Link to="/courses" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeftOutlined className="mr-2" />
            Back to Courses
          </Link>
          <Title level={1} className="text-white mb-2">{course.data.title}</Title>
          <Space className="flex flex-wrap items-center gap-4 mb-4">
            <Tag color="blue" className="flex items-center px-2 py-1">
              <UserOutlined className="mr-1" />
              {/* {course.studentsEnrolled.toLocaleString()} enrolled */}
            </Tag>
            <Tag color="blue" className="flex items-center px-2 py-1">
              <ClockCircleOutlined className="mr-1" />
              {/* {course.estimatedTime} */}
            </Tag>
            <Tag color="blue" className="flex items-center px-2 py-1">
              <BookOutlined className="mr-1" />
              {/* {course.lessons.length} lessons */}
            </Tag>
          </Space>
        </div>
      </div>

      <Content className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2">
            {/* Course Description */}
            <div className="mb-8">
              <Title level={2}>About This Course</Title>
              <Paragraph className="text-gray-600">{course.data.description}</Paragraph>
            </div>

            {/* Course Lessons */}
            <div className="mb-8">
              <Title level={2}>Course Content</Title>
              <Collapse accordion className="w-full bg-white">
                {/* {course.lessons.map((lesson:any, index:any) => (
                  <Panel 
                    key={lesson.id} 
                    header={
                      <div className="font-medium">
                        {index + 1}. {lesson.title}
                      </div>
                    }
                  >
                    <Paragraph className="text-gray-600 mb-2">{lesson.description}</Paragraph>
                    <div className="flex items-center justify-between">
                      <Tag color="blue" className="flex items-center">
                        <ClockCircleOutlined className="mr-1" />
                        {lesson.duration}
                      </Tag>
                      <Button type="link">Preview Lesson</Button>
                    </div>
                  </Panel>
                ))} */}
              </Collapse>
            </div>

            {/* FAQs */}
            <div className="mb-8">
              <Title level={2}>Frequently Asked Questions</Title>
              <Collapse accordion className="w-full bg-white">
                {/* {course.faqs.map((faq:any, index:any) => (
                  <Panel 
                    key={`faq-${index}`} 
                    header={faq.question}
                  >
                    <Paragraph className="text-gray-600">{faq.answer}</Paragraph>
                  </Panel>
                ))} */}
              </Collapse>
            </div>
          </div>

          {/* Sidebar - Right 1/3 */}
          <div>
            {/* Professor Card */}
            <Card className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                {/* <Avatar 
                  size={48} 
                  src={course.professor.avatar} 
                  alt={course.professor.name}
                /> */}
                <div>
                  <Title level={4} className="!mb-0">Your Instructor</Title>
                  {/* <Text type="secondary">{course.professor.name}</Text> */}
                </div>
              </div>
              {/* <Paragraph className="text-gray-600">{course.professor.bio}</Paragraph> */}
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
                    {/* Send a message to {course.professor.name} */}
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
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined />}
                        onClick={handleSendMessage}
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
                  <Title level={4}>Course Materials</Title>
                  <Paragraph type="secondary">
                    Download resources for this course
                  </Paragraph>
                  <List
                    // dataSource={course.materials}
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
    </Layout>
  );
};

export const courses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This course is perfect for beginners who want to start their journey in web development.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&h=630",
    professor: {
      id: "prof1",
      name: "Dr. Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Front-end development specialist with 12 years of industry experience and 5 years in education."
    },
    studentsEnrolled: 1245,
    estimatedTime: "8 weeks",
    lessons: [
      {
        id: "l1",
        title: "HTML Basics",
        description: "Learn the fundamental structure of web pages and how to create semantic HTML documents.",
        duration: "1 hour 20 minutes"
      },
      {
        id: "l2",
        title: "CSS Styling",
        description: "Discover how to style your HTML elements with CSS to create beautiful web pages.",
        duration: "2 hours"
      },
      {
        id: "l3",
        title: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming to add interactivity to your websites.",
        duration: "2 hours 30 minutes"
      },
      {
        id: "l4",
        title: "Responsive Design",
        description: "Make your websites look great on all devices with responsive design techniques.",
        duration: "1 hour 45 minutes"
      },
      {
        id: "l5",
        title: "Web Development Tools",
        description: "Explore essential developer tools that will improve your workflow and productivity.",
        duration: "1 hour 15 minutes"
      }
    ],
    faqs: [
      {
        question: "Do I need prior programming experience?",
        answer: "No prior experience is needed. This course is designed for complete beginners."
      },
      {
        question: "What software will I need?",
        answer: "You'll need a text editor (we recommend VS Code), a modern web browser, and an internet connection."
      },
      {
        question: "Will I get a certificate after completion?",
        answer: "Yes, you'll receive a certificate of completion once you finish all course modules and assignments."
      },
      {
        question: "How much time should I dedicate per week?",
        answer: "We recommend dedicating at least 6-8 hours per week to get the most out of this course."
      }
    ],
    materials: [
      {
        name: "Course Syllabus",
        url: "#syllabus"
      },
      {
        name: "HTML Cheat Sheet",
        url: "#html-cheatsheet"
      },
      {
        name: "CSS Reference Guide",
        url: "#css-guide"
      }
    ]
  },
  {
    id: "2",
    title: "Advanced React Development",
    description: "Take your React skills to the next level with advanced concepts, state management, and performance optimization techniques.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=1200&h=630",
    professor: {
      id: "prof2",
      name: "Prof. Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "React expert and software architect with experience at major tech companies and open source contributions."
    },
    studentsEnrolled: 876,
    estimatedTime: "10 weeks",
    lessons: [
      {
        id: "l1",
        title: "React Hooks Deep Dive",
        description: "Master the use of React hooks to manage state and side effects in functional components.",
        duration: "2 hours"
      },
      {
        id: "l2",
        title: "Redux and Context API",
        description: "Compare and implement different state management solutions for React applications.",
        duration: "2 hours 15 minutes"
      },
      {
        id: "l3",
        title: "Performance Optimization",
        description: "Learn techniques to identify and resolve performance bottlenecks in React applications.",
        duration: "1 hour 50 minutes"
      },
      {
        id: "l4",
        title: "Testing React Applications",
        description: "Implement comprehensive testing strategies for your React applications.",
        duration: "2 hours 10 minutes"
      },
      {
        id: "l5",
        title: "Server-Side Rendering",
        description: "Explore SSR and static site generation to improve performance and SEO.",
        duration: "1 hour 45 minutes"
      }
    ],
    faqs: [
      {
        question: "What prerequisites are required?",
        answer: "Basic knowledge of React, JavaScript, and ES6 syntax is required. Our 'Introduction to React' course is a good prerequisite."
      },
      {
        question: "Will we build real-world projects?",
        answer: "Yes, you'll build several production-quality applications throughout the course, including a full-stack application."
      },
      {
        question: "Is this course up to date with the latest React version?",
        answer: "Yes, we constantly update our material to cover the latest React features and best practices."
      },
      {
        question: "How is the course structured?",
        answer: "The course includes video lectures, coding exercises, assignments, and a final project. You'll also have access to our community forum for support."
      }
    ],
    materials: [
      {
        name: "Course Syllabus",
        url: "#syllabus"
      },
      {
        name: "React Patterns Guide",
        url: "#patterns"
      },
      {
        name: "Performance Optimization Checklist",
        url: "#optimization"
      }
    ]
  }
];

export const getCourseById = (id: string): any => {
  return courses.find(course => course.id === id);
};

export const getAllCourses = (): any => {
  return courses;
};