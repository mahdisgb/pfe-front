import { useTranslation } from '@refinedev/core';
import { Layout } from 'antd';
import Sidebar from '../pages/profile/professor/Components/Sidebar';

const { Content, Sider } = Layout;

export const ProfessorPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { translate: t } = useTranslation();

  return (
    <Layout className="min-h-screen">
      <Sider width={250} className="bg-white">
        <Sidebar />
      </Sider>
      <Content className="p-6">
        {children}
      </Content>
    </Layout>
  );
};
