import { useTranslation } from '@refinedev/core';
import { Button, Form, Input, Select, message } from 'antd';
import { useRegister } from '@refinedev/core';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const { translate: t } = useTranslation();
  const { mutate: register } = useRegister();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    register(values, {
      onSuccess: () => {
        message.success(t('auth.registerSuccess'));
        navigate('/login');
      },
      onError: () => {
        message.error(t('auth.registerError'));
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.registerTitle')}
          </h2>
        </div>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="mt-8 space-y-6"
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: t('auth.firstNameRequired') }]}
          >
            <Input placeholder={t('auth.firstName')} size="large" />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: t('auth.lastNameRequired') }]}
          >
            <Input placeholder={t('auth.lastName')} size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('auth.emailRequired') },
              { type: 'email', message: t('auth.emailInvalid') }
            ]}
          >
            <Input placeholder={t('auth.email')} size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('auth.passwordRequired') }]}
          >
            <Input.Password placeholder={t('auth.password')} size="large" />
          </Form.Item>

          <Form.Item
            name="userType"
            rules={[{ required: true, message: t('auth.userTypeRequired') }]}
          >
            <Select placeholder={t('auth.selectUserType')} size="large">
              <Select.Option value="student">{t('auth.student')}</Select.Option>
              <Select.Option value="professor">{t('auth.professor')}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t('auth.register')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}; 