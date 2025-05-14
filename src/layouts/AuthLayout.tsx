import { Layout, Menu } from 'antd';
import { useGetIdentity, useTranslation } from '@refinedev/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOutlined, 
  UserOutlined, 
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { PropsWithChildren } from 'react';

const { Sider, Content } = Layout;

type AuthLayoutProps = {
  children: any;
} & PropsWithChildren;

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { data: user } = useGetIdentity<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const { translate: t } = useTranslation();

  const getMenuItems = () => {
    const commonItems = [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Profile',
        onClick: () => navigate('/profile')
      }
    ];

    const studentItems = [
      {
        key: 'my-courses',
        icon: <BookOutlined />,
        label: 'My Courses',
        onClick: () => navigate('/profile/my-courses')
      },
      {
        key: 'achievements',
        icon: <CheckCircleOutlined />,
        label: 'Achievements',
        onClick: () => navigate('/profile/achievements')
      }
    ];

    const professorItems = [
      {
        key: 'courses',
        icon: <BookOutlined />,
        label: 'Courses',
        onClick: () => navigate('/profile/courses')
      },
      {
        key: 'lessons',
        icon: <FileTextOutlined />,
        label: 'Lessons',
        onClick: () => navigate('/profile/lessons')
      }
    ];

    const adminItems = [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        onClick: () => navigate('/profile/dashboard')
      },
      {
        key: 'professor-requests',
        icon: <TeamOutlined />,
        label: 'Professor Requests',
        onClick: () => navigate('/profile/professor-requests')
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Settings',
        onClick: () => navigate('/profile/settings')
      }
    ];

    if (user?.roles?.includes('admin')) {
      return [...commonItems, ...adminItems];
    } else if (user?.roles?.includes('professor')) {
      return [...commonItems, ...professorItems];
    } else {
      return [...commonItems, ...studentItems];
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="light">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold">Learning Platform</h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split('/')[2] || 'profile']}
          items={getMenuItems()}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24,  }}>
          <div className="text-center mb-8">
            {/* <h1 className="text-2xl font-bold text-gray-900">
              {t('auth.loginTitle')}
            </h1> */}
          </div>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout; 