import { useLogin, useRegister } from "@refinedev/core";
import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Radio, Select, message } from "antd"
import { useNavigate } from "react-router-dom"
import "./login.css"
// import GNE from "../../assets/IT.png"

type UserType = "student" | "professor";
type FormType = "login" | "register";

export const Login = () => {
  const { mutate: login, isLoading, isError } = useLogin();
  const { mutate: register } = useRegister();
  const [formType, setFormType] = useState<FormType>("login");
  const [userType, setUserType] = useState<UserType>("student");
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const handleSubmit = async () => {
    if (formType === "login") {
      try {
        const values = await loginForm.validateFields();
        await login(values);
      } catch (error: any) {
        message.error(error);
      }
    } else {
      try {
        const values = await registerForm.validateFields();
        await register({ ...values, role: userType });
      } catch (error: any) {
        message.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          {/* <img src={GNE} alt="Logo" className="h-16 mx-auto mb-4" /> */}
          <h2 className="text-2xl font-bold text-gray-800">
            {formType === "login" ? "Login" : "Register"}
          </h2>
        </div>

        {formType === "login" ? (
          <Form
            form={loginForm}
            layout="vertical"
            initialValues={{ email: "a@3.co", password: "password" }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input type="email" placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
                className="w-full"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form form={registerForm} layout="vertical">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input type="email" placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item
              name="userType"
              label="Register as"
              rules={[{ required: true, message: "Please select user type" }]}
            >
              <Select
                value={userType}
                onChange={(value) => setUserType(value)}
                placeholder="Select user type"
              >
                <Select.Option value="student">Student</Select.Option>
                <Select.Option value="professor">Professor</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
                className="w-full"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        )}

        <div className="mt-4">
          <Radio.Group
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="w-full"
          >
            <Radio.Button value="login" className="w-1/2 text-center">
              Login
            </Radio.Button>
            <Radio.Button value="register" className="w-1/2 text-center">
              Register
            </Radio.Button>
          </Radio.Group>
        </div>
      </Card>
    </div>
  );
};