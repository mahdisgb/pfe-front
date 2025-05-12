import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons';
import { useCreate, useUpdate } from '@refinedev/core';
import { Avatar, Button, Col, Form, Input,Modal, Select, Row, Typography, Tag, message } from 'antd'
import dayjs from 'dayjs';
import { cp } from 'fs';
import React from 'react'
type ProcessRequestModalProps = {
  open: boolean,
  onCancel: () => void,
  selectedRequest: any | undefined
};
export const ProcessRequestModal = ({open,onCancel,selectedRequest}:ProcessRequestModalProps) => {
  const [form] = Form.useForm();
  const{mutateAsync:processRequest}=useUpdate()
  const handleSubmit = async() => {
    try {
      const values=await form.getFieldsValue();
      
      await processRequest({
        resource:`admin/professor-requests/${selectedRequest.id}`,
        meta:{
          requestId:selectedRequest.id
        },
        id:selectedRequest.id,
        values:{
        ...values
        }
      },{
          onSuccess:()=>{
            message.success("Request processed successfully")
            onCancel()
          },
          onError:(error)=>{
            message.error("Failed to process request")
          }
      })
    } catch (error) {
      
    }
  }
  const statusColor={
    approved:"green",
    rejected:"red",
    pending:"blue"
  }
  return (
    <Modal
     open={open}
     onCancel={onCancel}
     footer={[
      <div className="flex items-center justify-end gap-2">
      <Button type="default" onClick={onCancel}>Cancel</Button>
      <Button type="primary" onClick={handleSubmit}>Submit</Button>
  </div>
     ]}
     maskClosable={false}
    centered
    title="Process Request"
> 
<div style={{
  padding:"10px"
}}>

     <Row style={{
      border:"2px solid #f0f0f0",
      backgroundColor:"#f9f9f9",
      borderRadius:"10px",
      padding:"10px"
     }}>
      <Col span={4}>
                <Avatar
                  size={60}
                  icon={
                   <UserOutlined />
                  }
                  style={{ backgroundColor: "#1890ff" }}
                />
              </Col>
              <Col span={20}>
              <div className="flex items-start justify-between w-full">
              <div>
                <Typography.Title level={5} style={{ marginBottom: 0 }}>
                 {selectedRequest.user.firstName} {selectedRequest.user.lastName}
                </Typography.Title>
                
                <p  style={{ marginBottom: 2 }}>
                {selectedRequest.user.email}
                </p>
               
                <div>
                </div>
                  </div>
                  <Typography.Text type="secondary">
                  {dayjs(selectedRequest.createdAt).format("DD-MM-YYYY")}
                </Typography.Text>
              <Tag color={statusColor[selectedRequest.status as keyof typeof statusColor]} >{selectedRequest.status} </Tag>
                  </div>
              </Col>
     </Row>

        <Form form={form} layout="vertical" style={{
         marginTop:20
}}>

          <Form.Item label="Status" name="status">
            <Select 
            placeholder="Select Status"
            options={[{label:"Approved",value:"approved"},{label:"Rejected",value:"rejected"}]} />

          </Form.Item>
            <Form.Item  label="Admin Notes" name="adminNotes">
                <Input.TextArea placeholder="Enter Admin Notes" />
            </Form.Item>
        </Form>
</div>

    </Modal>
  )
}
