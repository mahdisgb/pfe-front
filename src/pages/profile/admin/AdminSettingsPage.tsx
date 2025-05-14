import { useTranslation } from '@refinedev/core';
import { Card, Form, Input, Button, Switch, Space } from 'antd';

export const AdminSettingsPage = () => {
  const { translate: t } = useTranslation();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    // Handle settings update
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('admin.settings.title')}</h1>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="siteName"
            label={t('admin.settings.siteName')}
            rules={[{ required: true, message: t('admin.settings.siteNameRequired') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="contactEmail"
            label={t('admin.settings.contactEmail')}
            rules={[
              { required: true, message: t('admin.settings.contactEmailRequired') },
              { type: 'email', message: t('admin.settings.invalidEmail') }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="enableRegistration"
            label={t('admin.settings.enableRegistration')}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="enableComments"
            label={t('admin.settings.enableComments')}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button type="primary" htmlType="submit">
                {t('modal.save')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};