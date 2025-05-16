import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import { getCourseById } from "@/data/coursesData";
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Tag, 
  message,
  Row,
  Col,
  Typography,
  Divider,
  
} from "antd";
import { 
  ArrowLeftOutlined, 
  BookOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CreditCardOutlined, 
  UserOutlined 
} from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import { useCreate, useGetIdentity, useOne, useTranslation } from "@refinedev/core";

const { Title, Text } = Typography;

interface PaymentFormValues {
  fullName: string;
  email: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

const Enrollment = () => {
    
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const {data:user}=useGetIdentity<any>();
  const { translate: t } = useTranslation();

  const [form] = Form.useForm<PaymentFormValues>();
  const {data:course}=useOne({
    resource:"courses",
    id:courseId
  })
  const {mutateAsync:enrollToCourse}=useCreate({
    resource:"course-subscriptions/subscribe",
  });

  const onSubmit = async (values: PaymentFormValues) => {
    setIsProcessing(true);
    try {
        const values = await form.validateFields();
        console.log(values)
        await enrollToCourse({
            values:{
                ...values,
              courseId,
              userId:user?.id,
            }
          },{
            onSuccess:(data:any)=>{
              message.success("Course enrolled successfully")
            },
            onError:(error:any)=>{
              message.error("Failed to enroll to course")
            }
          })
      // Simulate payment processing
      message.success(`Successfully enrolled in ${course?.data?.title}`);
    setIsProcessing(false);
      navigate(`/course/${courseId}`);
    } catch (error) {
      message.error("Enrollment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  if (!course) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Title level={2}>Course not found</Title>
        <Text className="mb-6 block">The course you're looking for doesn't exist or has been removed.</Text>
        <Link to="/courses">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Back to Course
          </Button>
        </Link>
      </div>
    );
  }
 

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Link to={`/course/${courseId}`}>
        <Button type="link" icon={<ArrowLeftOutlined />}>
          {t('common.backToCourses')}
        </Button>
      </Link>
      
      <Title level={2} className="mb-8">{t('enrollment.title')}</Title>
      
      <Row gutter={[24, 24]}>
        {/* Course Summary */}
        <Col xs={24} lg={8}>
          <Card title={t('enrollment.courseSummary')}>
            <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
              <img 
                src={course?.data?.thumbnail} 
                alt={course?.data?.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <Title level={4}>{course?.data?.title}</Title>
            
            <div className="flex items-center space-x-4 mb-4">
              <Avatar  size={40}>
                {course?.data?.professor.firstName.charAt(0)}
              </Avatar>
              <div>
                <Text strong>{course?.data?.professor.firstName}</Text>
                <br />
                <Text type="secondary">{t('enrollment.professor')}</Text>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Tag icon={<BookOutlined />}>
                {course?.data?.lessonCount} {t('course.lessons')}
              </Tag>
              <Tag icon={<ClockCircleOutlined />}>
                {/* {course?.data?.estimatedTime} */}
              </Tag>
              <Tag icon={<UserOutlined />}>
                {/* {course?.data?.studentsEnrolled.toLocaleString()} enrolled */}
              </Tag>
            </div>
            
            <Divider />
            
            <div className="flex justify-between">
              <Text strong>{t('enrollment.coursePrice')}</Text>
              <Text strong className="text-purple-600">{course?.data?.price}</Text>
            </div>
          </Card>
        </Col>
        
        {/* Payment Form */}
        <Col xs={24} lg={16}>
          <Card 
            title={
              <span>
                <CreditCardOutlined className="mr-2" />
                {t('enrollment.paymentDetails')}
              </span>
            }
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onSubmit}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="fullName"
                    label={t('enrollment.fullName')}
                    rules={[{ required: true, message: t('enrollment.nameRequired') }]}
                  >
                    <Input placeholder={t('enrollment.fullNamePlaceholder')} />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label={t('enrollment.email')}
                    rules={[
                      { required: true, message: t('enrollment.emailRequired') },
                      { type: "email", message: t('enrollment.emailInvalid') }
                    ]}
                  >
                    <Input placeholder={t('enrollment.emailPlaceholder')} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="cardNumber"
                label={t('enrollment.cardNumber')}
                rules={[
                  { required: true, message: t('enrollment.cardNumberRequired') },
                  { pattern: /^[0-9\s]{19}$/, message: t('enrollment.cardNumberInvalid') }
                ]}
              >
                <Input 
                  placeholder={t('enrollment.cardNumberPlaceholder')}
                  maxLength={19}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 16) {
                      const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                      form.setFieldValue("cardNumber", formatted);
                    }
                  }}
                />
              </Form.Item>
              
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="cardExpiry"
                    label={t('enrollment.expiryDate')}
                    rules={[
                      { required: true, message: t('enrollment.expiryDateRequired') },
                      { pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/, message: t('enrollment.expiryDateInvalid') }
                    ]}
                  >
                    <Input 
                      placeholder={t('enrollment.expiryDatePlaceholder')}
                      maxLength={5}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        form.setFieldValue("cardExpiry", value);
                      }}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="cardCvv"
                    label={t('enrollment.cvv')}
                    rules={[
                      { required: true, message: t('enrollment.cvvRequired') },
                      { pattern: /^[0-9]{3}$/, message: t('enrollment.cvvInvalid') }
                    ]}
                  >
                    <Input 
                      placeholder={t('enrollment.cvvPlaceholder')}
                      maxLength={3}
                    />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isProcessing}
                  icon={<CheckCircleOutlined />}
                  block
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {t('enrollment.completeEnrollment')} • {course?.data?.price}
                </Button>
                <Text type="secondary" className="block text-center mt-4 text-xs">
                  {t('enrollment.termsAgreement')}
                </Text>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Enrollment;