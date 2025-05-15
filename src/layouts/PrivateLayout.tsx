import React from 'react';
import { useTranslation } from '@refinedev/core';
import { Layout } from 'antd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const { Content } = Layout;

export const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { translate: t } = useTranslation();

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-1 p-6">
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};