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
  SettingOutlined,
  CommentOutlined,
  SolutionOutlined,
  PlayCircleOutlined,
  FormOutlined
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

    const studentItems = [
      {
        key: 'profile',
        icon: <BookOutlined />,
        label: 'Profile',
        onClick: () => navigate('/profile/student-dashboard')
      },
      {
        key: 'my-courses',
        icon: <PlayCircleOutlined />,
        label: 'My Courses',
        onClick: () => navigate('/profile/my-courses')
      },
     
    ];

    const professorItems = [
      {
        key: 'profile',
        icon: <BookOutlined />,
        label: 'Profile',
        onClick: () => navigate('/profile')
      },
      {
        key: 'courses',
        icon: <PlayCircleOutlined />,
        label: 'Courses',
        onClick: () => navigate('/profile/courses')
      },
      {
        key: 'lessons',
        icon: <FormOutlined />,
        label: 'Lessons',
        onClick: () => navigate('/profile/lessons')
      }
    ];

    const adminItems = [
      // {
      //   key: 'profile',
      //   icon: <BookOutlined />,
      //   label: 'Profile',
      //   onClick: () => navigate('/profile')
      // },
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        onClick: () => navigate('/profile/dashboard')
      },
      {
        key: 'professor-requests',
        icon:<SolutionOutlined />,
        label: 'Professor Requests',
        onClick: () => navigate('/profile/professor-requests')
      },
      {
        key: 'manage-courses',
        icon: <PlayCircleOutlined />,
        label: 'Manage Courses',
        onClick: () => navigate('/profile/manage-courses')
      },
        {
          key: 'manage-users',
          icon: <TeamOutlined />,
          label: 'Manage Users',
          onClick: () => navigate('/profile/manage-users')
        },
        {
          key: 'manage-chat',
          icon: <CommentOutlined />,
          label: 'Manage Chat',
          onClick: () => navigate('/profile/manage-chat')
        },
      // {
      //   key: 'settings',
      //   icon: <SettingOutlined />,
      //   label: 'Settings',
      //   onClick: () => navigate('/profile/settings')
      // }
    ];

    if (user?.roles?.includes('admin')) {
      return adminItems;
    } else if (user?.roles?.includes('professor')) {
      return professorItems;
    } else {
      return studentItems;
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