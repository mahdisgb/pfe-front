import { useTranslation } from '@refinedev/core';
import { Card, Row, Col, Statistic } from 'antd';
import { BookOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';

export const ProfessorDashboard = () => {
  const { translate: t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('profile.professor.dashboard')}</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t('profile.professor.totalCourses')}
              value={12}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t('profile.professor.totalStudents')}
              value={456}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t('profile.professor.totalRevenue')}
              value={7890}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 