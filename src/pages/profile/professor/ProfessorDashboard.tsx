import { useGetIdentity, useTranslation, useUpdate } from '@refinedev/core';
import { Card, Row, Col, Statistic, Avatar, Button, Form, Input, Select } from 'antd';
import { BookOutlined, UserOutlined, DollarOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

export const ProfessorDashboard = () => {
  const { translate: t } = useTranslation();
  const { data: user } = useGetIdentity<any>();
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm] = Form.useForm();
  const { mutateAsync: updateUser } = useUpdate();

  const handleSubmit = async () => {
    try {
      const values = await registerForm.validateFields();
      setIsLoading(true);
      const res = await updateUser({
        resource: `auth/user/${user.id}`,
        values,
        id: user.id
      });
      localStorage.setItem("refine_user", JSON.stringify(res?.data?.data?.user!));
      setIsLoading(false);
      setEditing(false);
      registerForm.resetFields();
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (editing) {
      registerForm.setFieldsValue({
        ...user
      });
    }
  }, [editing]);

  return (
    <div>
      {!editing ? (
        <Button onClick={() => setEditing(true)}>
          <EditOutlined />
          {t('profile.professor.editProfile')}
        </Button>
      ) : (
        <div className='flex items-center gap-2'>
          <Button
            type='primary'
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <EditOutlined />
            {t('profile.professor.submit')}
          </Button>
          <Button
            onClick={() => {
              setEditing(false);
              registerForm.resetFields();
            }}
          >
            {t('profile.professor.cancel')}
          </Button>
        </div>
      )}

      {!editing ? (
        <Card className='max-w-[500px] mt-2'>
          <div className='flex items-start gap-3'>
            <div>
              <Avatar 
                icon={<UserOutlined />}
                size={100}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>{user?.firstName} {user?.lastName}</div>
              <div style={{ fontSize: "16px", color: "gray" }}>{user?.email}</div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className='max-w-[500px] mt-2'>
          <Avatar 
            icon={<UserOutlined />}
            size={100}
          />
          <Form
            form={registerForm}
            layout="vertical"
            className="mt-8 space-y-6"
          >
            <Form.Item
              name="firstName"
              label={t('profile.professor.form.firstName')}
              rules={[{ required: true, message: t('auth.firstNameRequired') }]}
            >
              <Input placeholder={t('auth.firstName')} />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={t('profile.professor.form.lastName')}
              rules={[{ required: true, message: t('auth.lastNameRequired') }]}
            >
              <Input placeholder={t('auth.lastName')} />
            </Form.Item>

            <Form.Item
              name="email"
              label={t('profile.professor.form.email')}
              rules={[
                { required: true, message: t('auth.emailRequired') },
                { type: 'email', message: t('auth.emailInvalid') }
              ]}
            >
              <Input placeholder={t('auth.email')} />
            </Form.Item>

            <Form.Item
              name="currentPassword"
              label={t('profile.professor.form.currentPassword')}
              rules={[{ required: true, message: t('auth.passwordRequired') }]}
            >
              <Input.Password placeholder={t('profile.professor.form.currentPassword')} />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label={t('profile.professor.form.newPassword')}
              rules={[{ required: true, message: t('auth.passwordRequired') }]}
            >
              <Input.Password placeholder={t('profile.professor.form.newPassword')} />
            </Form.Item>
          </Form>
        </Card>
      )}

      <Row gutter={[16, 16]} className="mt-4">
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
              value={6}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={t('profile.professor.totalRevenue')}
              value={25000}
              // prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 