import {  useLogin, useRegister } from "@refinedev/core";
import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Radio, Select, message } from "antd"
import { useNavigate } from "react-router-dom"
// import "./login.css"
import { useTranslation } from '@refinedev/core';
import { RegisterPage } from "./components/RegisterPage";
import { LoginForm } from "./components/LoginForm";

type UserType = "student" | "professor";
type FormType = "login" | "register";

export const Login = () => {
  const { translate: t } = useTranslation();
  const [formType, setFormType] = useState<FormType>("login");
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    style={{
      // background: "linear-gradient(#1e55a9 ,#fff)",
      background: "url('/bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    >
      <h1 className="font-bold text-center text-white" style={{fontSize:"80px"}}>Welcome to Wajihni</h1>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
            {formType === "login" ? t('auth.loginTitle') : t('auth.registerTitle')}
          </h2>
        </div>

        <div className="mt-4">
          <Radio.Group
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="w-full"
          >
            <Radio.Button value="login" className="w-1/2 text-center text-lg">
              {t('auth.login')}
            </Radio.Button>
            <Radio.Button value="register" className="w-1/2 text-center text-lg">
              {t('auth.register')}
            </Radio.Button>
          </Radio.Group>
        </div>

        {formType === "login" ? (
          <LoginForm />
        ) : (
          <RegisterPage />
        )}
      </div>
    </div>
  );
};