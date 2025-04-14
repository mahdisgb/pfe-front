import { useLogin, useRegister } from "@refinedev/core";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Button, Card, Col, Form, Input, Radio, Row, Select, message } from "antd"
import { useNavigate } from "react-router-dom"
import "./login.css"
import GNE from "../../assets/IT.png"
// eslint-disable-next-line import/order
// eslint-disable-next-line import/order
// eslint-disable-next-line import/order

export const Login = () => {
  const { mutate: login, isLoading, isError } = useLogin();
  const { mutate: register } = useRegister();
  const [loginType, setLoginType] = useState<"register" | "login">("login")
  const [form] = Form.useForm()


  const handleSubmit= async () => {
    const values = await form.validateFields();
    if (loginType === "login") {
      try {
        await login(values)
      } catch (error: any) {
        message.error(error)
      }
    } else {
      try {
        await register(values)
      } catch (error: any) {
        message.error(error)
      }
    }

  }
  const colSpan = {
    xs: 20,
    md: 16,
    lg: 7,
    xl: 7,
    xxl: 7,
  }
  form.setFieldsValue({
    email:"a@3.co",
    password:"password"
  })
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Card
        style={{
          maxWidth: "50vw", backgroundColor: "#f7f7f7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {loginType === "login" ? <Form
          // labelCol={{ span: 9 }}
          labelAlign="left"
          form={form}
          layout="vertical"
          validateTrigger="onBlur"

        >
          <Form.Item
            name="email"
            label="Email :"
            rules={[{ required: true, message: "email is required" }]}
          >
            <Input type="email" placeholder="enter email" defaultValue={"a@3.co"} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password :"
            rules={[{ required: true, message: "password is required" }]}

          >
            <Input.Password
              placeholder="enter password"
              defaultValue={"password"}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              size="large"
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
            >
              login
            </Button>
          </Form.Item>
        </Form> :
          <Form
            // labelCol={{ span: 9 }}
            labelAlign="left"
            form={form}
            layout="vertical"
            validateTrigger="onBlur"

          >
            <Form.Item
              name="lastName"
              label="Last Name :"
              rules={[{ required: true, message: "last name is required" }]}
            >
              <Input placeholder="enter last name" />
            </Form.Item>
            <Form.Item
              name="firstName"
              label="First Name :"
              rules={[{ required: true, message: "first name is required" }]}
            >
              <Input placeholder="enter first name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email :"
              rules={[{ required: true, message: "email is required" }]}
            >
              <Input type="email" placeholder="enter email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password :"
              rules={[{ required: true, message: "password is required" }]}

            >
              <Input.Password
                placeholder="enter password"
              />
            </Form.Item>
            <Form.Item
              name="role"
              label="Profile Type :"
              rules={[{ required: true, message: "profile type is required" }]}
            >
            <Select placeholder="select profile type">
              <Select.Option value={"student"}>
                Student
              </Select.Option>
              <Select.Option value={"professor"}>
                Professor
              </Select.Option>
            </Select>
            </Form.Item>
            <Form.Item>
              <Button
                loading={isLoading}
                size="large"
                type="primary"
                htmlType="submit"
              onClick={handleSubmit}

              >
                register
              </Button>
            </Form.Item>
          </Form>}

        <Radio.Group
          onChange={(e) => {
            console.log(e)
            setLoginType(e.target.value);
            form.resetFields();
          }}
          className="flex gap-3 w-[100%]"
          defaultValue={loginType}
          value={loginType}
        >
          <Radio.Button className="flex-1" value={"login"}>
            login
          </Radio.Button>
          <Radio.Button className="flex-1" value={"register"}>
            register
          </Radio.Button>
        </Radio.Group>
      </Card>


    </div>
  )

};