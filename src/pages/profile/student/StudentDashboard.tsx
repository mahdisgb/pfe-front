import { useTranslation } from '@refinedev/core';
import { Card, Row, Col, Statistic } from 'antd';
import { BookOutlined, ClockCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import { useList } from '@refinedev/core';

export const StudentDashboard = () => {
  const { translate: t } = useTranslation();
  const { data: enrolledCourses } = useList({
    resource: 'course-subscriptions',
    filters: [
      {
        field: 'userId',
        operator: 'eq',
        value: 'current-user-id'
      }
    ]
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">{t('profile.student.dashboard')}</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title={t('profile.student.enrolledCourses')}
              value={enrolledCourses?.data?.length || 0}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title={t('profile.student.learningHours')}
              value={0}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title={t('profile.student.completedCourses')}
              value={0}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 