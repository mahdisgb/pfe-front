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
import { useCreate, useGetIdentity, useOne } from "@refinedev/core";

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
      navigate(`/course/${courseId}`);
    } catch (error) {
      message.error("Enrollment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ')
      .substr(0, 19) || '';
  };
  if (!course) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Title level={2}>Course not found</Title>
        <Text className="mb-6 block">The course you're looking for doesn't exist or has been removed.</Text>
        <Link to="/courses">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Back to Courses
          </Button>
        </Link>
      </div>
    );
  }
 

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Link to={`/course/${courseId}`}>
        <Button type="link" icon={<ArrowLeftOutlined />}>
          Back to Course Details
        </Button>
      </Link>
      
      <Title level={2} className="mb-8">Enroll in Course</Title>
      
      <Row gutter={[24, 24]}>
        {/* Course Summary */}
        <Col xs={24} lg={8}>
          <Card title="Course Summary">
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
                <Text type="secondary">Professor</Text>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Tag icon={<BookOutlined />}>
                {course?.data?.lessonCount} lessons
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
              <Text strong>Course Price:</Text>
              <Text strong className="text-purple-600">$49.99</Text>
            </div>
          </Card>
        </Col>
        
        {/* Payment Form */}
        <Col xs={24} lg={16}>
          <Card 
            title={
              <span>
                <CreditCardOutlined className="mr-2" />
                Payment Details
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
                    label="Full Name"
                    rules={[{ required: true, message: "Please enter your full name" }]}
                  >
                    <Input placeholder="John Doe" />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                    //   { type: "email", message: "Please enter a valid email" }
                    ]}
                  >
                    <Input placeholder="john.doe@example.com" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="cardNumber"
                label="Card Number"
                rules={[
                  { required: true, message: "Please enter card number" },
                //   { min: 16, message: "Card number must be at least 16 digits" }
                ]}
              >
                <Input 
                type="number"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onChange={(e) => {
                    const value = formatCardNumber(e.target.value);
                    form.setFieldValue("cardNumber", value);
                  }}
                />
              </Form.Item>
              
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="cardExpiry"
                    label="Expiry Date"
                    rules={[
                      { required: true, message: "Please enter expiry date" },
                      { pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/, message: "Use MM/YY format" }
                    ]}
                  >
                    <Input 
                      placeholder="MM/YY"
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
                    label="CVV"
                    rules={[
                      { required: true, message: "Please enter CVV" },
                      { pattern: /^[0-9]{3}$/, message: "CVV must be 3 digits" }
                    ]}
                  >
                    <Input 
                      placeholder="123"
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
                  Complete Enrollment • $49.99
                </Button>
                <Text type="secondary" className="block text-center mt-4 text-xs">
                  By clicking "Complete Enrollment", you agree to our Terms of Service and Privacy Policy
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