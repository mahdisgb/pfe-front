import React from 'react';
import { useTranslation } from '@refinedev/core';
import { Layout, Button, Drawer, Input, List, Avatar, Space, Typography } from 'antd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { CloseOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons';
import { useGetIdentity } from '@refinedev/core';
import Chat from '@/components/Chat';
const { Content } = Layout;
const { Text } = Typography;

export const HomePageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { translate: t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, content: string, userId: number, timeAdded: string}>>([]);
  const { data: user } = useGetIdentity<{id: number, firstName: string, lastName: string}>();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      content: message,
      userId: user?.id || 0,
      timeAdded: new Date().toISOString()
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content>
        {children}
      </Content>
      
      <Footer />

      {/* Chat Bubble */}
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        onClick={() => setIsChatOpen(true)}
        style={{
          fontSize: '24px',
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          width: '50px',
          height: '50px'
        }}
      />

      {/* Chat Drawer */}
      <Drawer
        title="Chat"
        placement="left"
        onClose={() => setIsChatOpen(false)}
        open={isChatOpen}
        width={450}
       
      >
          <Chat roomId="course-1" />
      </Drawer>
    </Layout>
  );
};
