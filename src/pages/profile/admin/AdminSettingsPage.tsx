import { Card, Form, Input, Switch, Button, message } from 'antd';
import { useTranslation, useUpdate } from '@refinedev/core';
import { useState } from 'react';

export const AdminSettingsPage = () => {
  const { translate: t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: updateSettings } = useUpdate();

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await updateSettings({
        resource: 'settings',
        values,
        id: 1
      });
      message.success(t('profile.admin.settings.saveSuccess'));
    } catch (error) {
      message.error(t('profile.admin.settings.saveError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">{t('profile.admin.settings.title')}</h1>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            siteName: 'EduLearn Academy',
            contactEmail: 'contact@edulearn.com',
            enableRegistration: true,
            enableComments: true
          }}
        >
          <Form.Item
            name="siteName"
            label={t('profile.admin.settings.siteName')}
            rules={[{ required: true, message: t('profile.admin.settings.siteNameRequired') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="contactEmail"
            label={t('profile.admin.settings.contactEmail')}
            rules={[
              { required: true, message: t('profile.admin.settings.contactEmailRequired') },
              { type: 'email', message: t('profile.admin.settings.invalidEmail') }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="enableRegistration"
            label={t('profile.admin.settings.enableRegistration')}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="enableComments"
            label={t('profile.admin.settings.enableComments')}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('profile.admin.settings.save')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};