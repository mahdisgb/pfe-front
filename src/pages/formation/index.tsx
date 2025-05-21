import React from 'react'
import { useList, useLogin, useRegister } from "@refinedev/core";
import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Divider, Form, Input, Radio, Row,Tag,  Select, message, Typography, Collapse } from "antd"
import { useNavigate } from "react-router-dom"
import { useTranslation } from '@refinedev/core';
import dayjs from 'dayjs';
import { CheckCircleOutlined, UserOutlined, CreditCardOutlined, ClockCircleOutlined, BookOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { Panel } = Collapse;
export const Formation = () => {
    const { translate: t } = useTranslation();
    const { mutate: register } = useRegister();
    const [form] = Form.useForm();
    const navigate = useNavigate();
      const [isLoading, setIsLoading] = useState(false);
      const[payMethod, setPayMethod] = useState<'cash' | 'card'>('cash');
      const{data:formations}=useList({
        resource:"formations",
        pagination:{
          mode:"off"
        }
      })
    const handleSubmit = async () => {
        try {
          setIsLoading(true);
          const values = await form.validateFields();
          await register({ ...values}, {
            onSuccess: () => {
              message.success(t('auth.registerSuccess'));
              form.resetFields();
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
        <div className='flex items-center justify-center min-h-[90vh]'>
            <div className='flex flex-col gap-4 rounded-lg p-10'>
              {formations ? formations?.data?.map((formation:any)=>
          <Card style={{width:"600px"}}>
        <div className='flex items-end gap-3 w-full'>
          <div>
      <img src={formation.thumbnail} alt="" className='img max-w-[200px]' />
          </div>
          <div>
          <h1>{formation.title}</h1>
          <p>{formation.description}</p>
            <p>{formation.location}</p>
          <p>{dayjs(formation.date).format('DD/MM/YYYY HH:mm')}</p>
          </div>
        </div>
          <Button style={{float:"right"}} type='primary' onClick={()=>navigate(`/formation-enrollment/${formation.id}`)}>Enrol</Button>
          </Card>)
          :null}
                  {/* <div>
                    <img src="logo.jpeg" alt="" />
                </div> */}
      {/* <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Row gutter={10}>
        <Col span={12}>
        <Form.Item
        name="firstName"
        label={t('auth.firstName')}
        rules={[{ required: true, message: t('auth.firstNameRequired') }]}
      >
        <Input placeholder={t('auth.firstName')} size="large" />
      </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
        name="lastName"
        label={t('auth.lastName')}
        rules={[{ required: true, message: t('auth.lastNameRequired') }]}
      >
        <Input placeholder={t('auth.lastName')} size="large" />
      </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={24}>
        <Form.Item
        name="email"
        label={t('auth.email')}
        rules={[
          { required: true, message: t('auth.emailRequired') },
          { type: 'email', message: t('auth.emailInvalid') }
        ]}
      >
        <Input placeholder={t('auth.email')} size="large" />
      </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} style={{marginBottom: '10px'}}>
        <Radio.Group onChange={(e) => setPayMethod(e.target.value)}>
        <Radio value="cash">Cash</Radio>
        <Radio value="card">Card</Radio>
        </Radio.Group>
        </Col>
        <Col span={12}>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
        </Col>
        <Col span={12}>
        </Col>
      </Row>
        {payMethod === 'card' ?
        <>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="fullName"
                    label={t('enrollment.fullName')}
                    rules={[{ required: true, message: t('enrollment.nameRequired') }]}
                  >
                    <Input placeholder={t('enrollment.fullNamePlaceholder')} />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label={t('enrollment.email')}
                    rules={[
                      { required: true, message: t('enrollment.emailRequired') },
                      { type: "email", message: t('enrollment.emailInvalid') }
                    ]}
                  >
                    <Input placeholder={t('enrollment.emailPlaceholder')} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="cardNumber"
                label={t('enrollment.cardNumber')}
                rules={[
                  { required: true, message: t('enrollment.cardNumberRequired') },
                  { pattern: /^[0-9\s]{19}$/, message: t('enrollment.cardNumberInvalid') }
                ]}
              >
                <Input 
                  placeholder={t('enrollment.cardNumberPlaceholder')}
                  maxLength={19}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 16) {
                      const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                      form.setFieldValue("cardNumber", formatted);
                    }
                  }}
                />
              </Form.Item>
              
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="cardExpiry"
                    label={t('enrollment.expiryDate')}
                    rules={[
                      { required: true, message: t('enrollment.expiryDateRequired') },
                      { pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/, message: t('enrollment.expiryDateInvalid') }
                    ]}
                  >
                    <Input 
                      placeholder={t('enrollment.expiryDatePlaceholder')}
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
                    label={t('enrollment.cvv')}
                    rules={[
                      { required: true, message: t('enrollment.cvvRequired') },
                      { pattern: /^[0-9]{3}$/, message: t('enrollment.cvvInvalid') }
                    ]}
                  >
                    <Input 
                      placeholder={t('enrollment.cvvPlaceholder')}
                      maxLength={3}
                    />
                  </Form.Item>
                </Col>
              </Row>
              
     </>: null}
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
          {t('auth.register')}
        </Button>
      </Form.Item>
    </Form> */}
    </div>
    {/* <Collapse>
                <Panel key={} header={}>
                </Panel>
    </Collapse> */}
    
    </div>
    )
}
