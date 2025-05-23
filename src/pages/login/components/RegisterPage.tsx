import React from 'react'
import { useLogin, useRegister } from "@refinedev/core";
import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Radio, Select, message } from "antd"
import { useNavigate } from "react-router-dom"
import "./login.css"
import { useTranslation } from '@refinedev/core';

export const RegisterPage = () => {
  const { translate: t } = useTranslation();
  const { mutate: register } = useRegister();
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
  const handleSubmit = async () => {
      try {
        setIsLoading(true);
        const values = await registerForm.validateFields();
        await register({ ...values}, {
          onSuccess: () => {
            message.success(t('auth.registerSuccess'));
            registerForm.resetFields();
            setIsLoading(false);
          },
          onError: () => {
            message.error(t('auth.registerError'));
            setIsLoading(false);
          },
        });
      } catch (error: any) {
        message.error(error);
        setIsLoading(false);
      }
  };
  return (
    <div className="flex flex-col items-center ">
    <h1 style={{fontSize: "2rem", fontWeight: "bold", color: "#003366"}}>Sign Up</h1>
    <Form
    form={registerForm}
    onFinish={handleSubmit}
    layout="vertical"
    className="mt-6 "
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
      name="role"
      rules={[{ required: true, message: t('auth.userTypeRequired') }]}
    >
      <Select
        placeholder={t('auth.selectUserType')}
        size="large"
        onChange={(value) => setIsStudent(value === 'student')}
      >
        <Select.Option value="student">{t('auth.student')}</Select.Option>
        <Select.Option value="professor">{t('auth.professor')}</Select.Option>
      </Select>
    </Form.Item>

    {isStudent && (
      <Form.Item
        // name="school"
        rules={[{ required: true, message: "Student type is required" }]}
      >
        <Select
        placeholder={t('auth.selectUserType')}
        size="large"
      >
        <Select.Option value="mineur">Mineur</Select.Option>
        <Select.Option value="majeur">Majeur</Select.Option>
      </Select>
      </Form.Item>
    )}

    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
        loading={isLoading}
        disabled={isLoading}
        className="bg-[#003366] hover:bg-blue-700"
      >
        {t('auth.register')}
      </Button>
    </Form.Item>
  </Form>
  </div>
  )
}

