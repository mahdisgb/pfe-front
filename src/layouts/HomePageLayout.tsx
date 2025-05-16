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
        // extra={
        //   <Button 
        //     type="text" 
        //     icon={<CloseOutlined />} 
        //     onClick={() => setIsChatOpen(false)}
        //   />
        // }
      >
        {/* <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}> */}
          {/* Messages List */}
          <Chat roomId="course-1" />
          {/* <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
            <List
              dataSource={messages}
              renderItem={(msg) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{user?.firstName?.[0]}</Avatar>}
                    title={
                      <Space>
                        <Text strong>{user?.firstName} {user?.lastName}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {new Date(msg.timeAdded).toLocaleTimeString()}
                        </Text>
                      </Space>
                    }
                    description={msg.content}
                  />
                </List.Item>
              )}
            />
          </div>

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
            <Input.Group compact>
              <Input
                style={{ width: 'calc(100% - 40px)' }}
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onPressEnter={handleSendMessage}
              />
              <Button 
                type="primary" 
                icon={<SendOutlined />} 
                onClick={handleSendMessage}
              />
            </Input.Group>
          </div> */}
        {/* </div> */}
      </Drawer>
    </Layout>
  );
};
