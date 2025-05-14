import { useTranslation } from '@refinedev/core';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined, CheckCircleOutlined } from '@ant-design/icons';

export const AdminDashboardPage = () => {
  const { translate: t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('admin.dashboard.title')}</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('admin.dashboard.totalStudents')}
              value={1234}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('admin.dashboard.totalCourses')}
              value={56}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('admin.dashboard.totalProfessors')}
              value={23}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('admin.dashboard.activeEnrollments')}
              value={789}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};