import React from 'react'
import { useLogin, useRegister } from "@refinedev/core";
import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Radio, Select, message } from "antd"
import { useNavigate } from "react-router-dom"
import { useTranslation } from '@refinedev/core';
import "./login.css"

export const LoginForm = () => {
  const { mutate: login } = useLogin();
  const [loginForm] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const values = await loginForm.validateFields();
            await login(values, {
              onSuccess: () => {
                message.success(t('auth.loginSuccess'));
                navigate('/');
                setIsLoading(false);
              },
              onError: () => {
                message.error(t('auth.loginError'));
                setIsLoading(false);
              },
            });
          } catch (error: any) {
            message.error(error);
            setIsLoading(false);
          }
};
  return (
    <Form
            form={loginForm}
            onFinish={handleSubmit}
            layout="vertical"
            className="mt-8 space-y-6"
          >
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t('auth.login')}
              </Button>
            </Form.Item>
          </Form>
  )
}
