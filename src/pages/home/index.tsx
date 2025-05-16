import { useTranslation } from '@refinedev/core';
import { Button, Card, Row, Col, Typography } from 'antd';
import { BookOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import Chat from '@/components/Chat';

const { Title, Paragraph } = Typography;

export const Home = () => {
  const { translate: t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      {/* <Chat roomId={`course-2`} /> */}
      {/* Hero Section */}
      <div className='h-[70vh] bg-blue1 w-full flex items-center justify-center'>
        <div className="text-center">
          <h1 className='text-[4rem] text-white font-bold mb-4'>
            {t("common.welcome")}
          </h1>
          <Button type="primary" size="large" className="bg-white text-blue1 hover:bg-gray-100">
            {t("common.getStarted")}
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16 px-4">
        <Title level={2} className="text-center mb-12">
          {t("home.features.title")}
        </Title>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Card className="h-full text-center">
              <BookOutlined className="text-4xl text-blue-600 mb-4" />
              <Title level={4}>{t("home.features.qualityCourses.title")}</Title>
              <Paragraph>{t("home.features.qualityCourses.description")}</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="h-full text-center">
              <TeamOutlined className="text-4xl text-blue-600 mb-4" />
              <Title level={4}>{t("home.features.expertInstructors.title")}</Title>
              <Paragraph>{t("home.features.expertInstructors.description")}</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="h-full text-center">
              <TrophyOutlined className="text-4xl text-blue-600 mb-4" />
              <Title level={4}>{t("home.features.certification.title")}</Title>
              <Paragraph>{t("home.features.certification.description")}</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Popular Courses Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            {t("courses.filters.sortOptions.mostPopular")}
          </Title>
          <Row gutter={[24, 24]}>
            {/* Course cards will be added here */}
          </Row>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto py-16 px-4 text-center">
        <Title level={2} className="mb-4">
          {t("home.cta.title")}
        </Title>
        <Paragraph className="text-lg mb-8">
          {t("home.cta.description")}
        </Paragraph>
        <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
          {t("home.cta.button")}
        </Button>
      </div>
    </div>
  );
};