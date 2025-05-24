import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useTranslation } from '@refinedev/core';

export const AdminDashboardPage = () => {
  const { translate: t } = useTranslation();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">{t('profile.admin.dashboard.title')}</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('profile.admin.dashboard.totalStudents')}
              value={32}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('profile.admin.dashboard.totalCourses')}
              value={9}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('profile.admin.dashboard.totalProfessors')}
              value={6}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('profile.admin.dashboard.activeEnrollments')}
              value={16}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};