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
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        onClick: () => navigate('/profile/dashboard')
      },
      {
        key: 'profile',
        icon: <BookOutlined />,
        label: 'Profile',
        onClick: () => navigate('/profile/student-dashboard')
      },
      {
        key: 'my-courses',
        icon: <PlayCircleOutlined />,
        label: t('sidebar.myCourses'),
        onClick: () => navigate('/profile/my-courses')
      },
     
    ];

    const professorItems = [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        onClick: () => navigate('/profile/dashboard')
      },
      {
        key: 'profile',
        icon: <BookOutlined />,
        label: 'Profile',
        onClick: () => navigate('/profile')
      },
      ...(user?.roles?.includes('professor') && user?.status === 'active' ? [
      {
        key: 'courses',
        icon: <PlayCircleOutlined />,
        label: t('sidebar.myCourses'),
        onClick: () => navigate('/profile/courses')
      },
      {
        key: 'lessons',
        icon: <FormOutlined />,
        label: t('sidebar.myLessons'),
        onClick: () => navigate('/profile/lessons')
      }
    ] : [])
  ]

    const adminItems = [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        onClick: () => navigate('/profile/dashboard')
      },
      {
        key: 'professor-requests',
        icon:<SolutionOutlined />,
        label: t('sidebar.professorRequests'),
        onClick: () => navigate('/profile/professor-requests')
      },
      {
        key: 'manage-courses',
        icon: <PlayCircleOutlined />,
        label: t('sidebar.manageCourses'),
        onClick: () => navigate('/profile/manage-courses')
      },
        {
          key: 'manage-users',
          icon: <TeamOutlined />,
          label: t('sidebar.manageUsers'),
          onClick: () => navigate('/profile/manage-users')
        },
        {
          key: 'manage-chat',
          icon: <CommentOutlined />,
          label: t('sidebar.manageChat'),
          onClick: () => navigate('/profile/manage-chat')
        },
        {
          key: 'manage-formations',
          icon: <FormOutlined />,
          label: t('sidebar.manageFormations'),
          onClick: () => navigate('/profile/manage-formations')
        }
        
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
    <Layout style={{ minHeight: '100vh' }} dir='ltr'>
      <Sider width={250} theme="light">
     
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split('/')[2] || 'profile']}
          items={getMenuItems()}
          style={{ borderRight: 0,marginTop:20 }}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24,  }}>
         
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout; 