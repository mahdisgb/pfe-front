import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { format } from 'date-fns';
import axios from 'axios';
import { useGetIdentity, useTranslation } from '@refinedev/core';
import { Card, Input, Button, List, Typography, Avatar, Space, Divider, message } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';

interface Message {
  id: number;
  content: string;
  userId: number;
  userName: string;
  timeAdded: string;
}

interface ChatProps {
  roomId: string;
}

interface User {
  id: number;
  name: string;
}

const Chat = ({ roomId }: ChatProps) => {
  const { translate: t } = useTranslation();
  const { data: user } = useGetIdentity<User>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load message history
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/chat/room/${roomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error loading messages:', error);
        // message.error('Failed to load message history');
      }
    };

    loadMessages();
  }, [roomId]);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_APP_BACK_URL;
    
    const newSocket = io(socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      setIsConnected(true);
      message.success(t('chat.connected'));
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
      message.error(t('chat.connectionError'));
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setIsConnected(false);
      message.warning(t('chat.disconnected'));
    });

    newSocket.on('receive_message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.emit('join_room', roomId);

    setSocket(newSocket);

    return () => {
      newSocket.emit('leave_room', roomId);
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) {
      return;
    }

    const messageData = {
      roomId,
      message: newMessage,
      userId: user.id,
    };

    socket.emit('send_message', messageData, (error: any) => {
      if (error) {
        console.error('Error sending message:', error);
        message.error(t('chat.sendError'));
      }
    });

    setNewMessage('');
  };

  return (
    <Card 
      title={
        <Space>
          <Typography.Text>{t('chat.room')}</Typography.Text>
          <Typography.Text type={isConnected ? "success" : "danger"}>
            {isConnected ? t('chat.connected') : t('chat.disconnected')}
          </Typography.Text>
        </Space>
      }
      style={{ height: '95%', display: 'flex', flexDirection: 'column', border: 'none' }}
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          border: 'none',
          height: '100%'
        }
      }}
    >
      <List
        style={{ flex: 1, overflow: 'auto', padding: '16px' }}
        dataSource={messages}
        renderItem={(message:any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <Space>
                  <Typography.Text strong>{message?.user?.firstName} {message?.user?.lastName}</Typography.Text>
                  <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                    {format(new Date(message.timeAdded), 'MMM d, h:mm a')}
                  </Typography.Text>
                </Space>
              }
              description={message.content}
            />
          </List.Item>
        )}
      />
      <div ref={messagesEndRef} />
      
      <Divider style={{ margin: 0 }} />
      
      <form onSubmit={sendMessage} style={{ padding: '16px' }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('chat.messagePlaceholder')}
            disabled={!isConnected}
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            htmlType="submit"
            disabled={!isConnected || !newMessage.trim()}
          >
            {t('chat.send')}
          </Button>
        </Space.Compact>
      </form>
    </Card>
  );
};

export default Chat; 