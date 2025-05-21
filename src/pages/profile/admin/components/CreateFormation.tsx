import { InboxOutlined, UploadOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useCreate, useGetIdentity, useList, useOne, useUpdate, useTranslation } from "@refinedev/core";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
  UploadProps,
  Progress,
  Skeleton,
  DatePicker,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from "dayjs";

type CreateCourseProps = {
  open: boolean,
  onCancel: () => void,
  selectedFormationId: number | undefined
};
export const CreateFormation = ({ open, onCancel, selectedFormationId }: CreateCourseProps) => {
    const [form] = Form.useForm();
    const[uploading,setUploading]=useState(false);
    
    const {data:user}=useGetIdentity<any>();
    const {data:categories} = useList({
        resource:"categories",
        pagination:{
            mode:"off"
        }
    })
    const {mutateAsync:createCourse} =useCreate();
    const {mutateAsync:updateCourse} =useUpdate();
    const {data:formation,isFetched} = useOne({
        resource:"formations",
        id:selectedFormationId,
        meta:{
          enabled:!!selectedFormationId
        }
      })
    const fileRef = React.useRef(null);
    const { translate: t } = useTranslation();
    useEffect(()=>{
      if(isFetched && formation){
        console.log(formation)
        form.setFieldsValue({
          title:formation?.data?.title,
          description:formation?.data?.description,
          // categoryId:formation?.data?.categoryId,
          thumbnail:formation?.data?.thumbnail,
          price:formation?.data?.price,
          location:formation?.data?.location
        })
      }},[isFetched,formation])
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            // if (!fileRef.current)  {
            //     message.error("Please upload a thumbnail");
            //     return;
            // }
            // const binary = await fileRef.current.arrayBuffer();
            if (!fileRef.current) return;
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            // formData.append('categoryId', values.categoryId);
            formData.append('professorId', user?.id);
            formData.append('thumbnail', fileRef.current);
            formData.append('price', values.price);
            formData.append('location', values.location);
            formData.append('date', dayjs(values.date).format('YYYY-MM-DD HH:mm'));
            setUploading(true)
            await createCourse({
                resource: "formations",
                values: formData,
                meta: {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            });
            setUploading(false)

            message.success("Course created successfully");
            handleCancel();

        } catch (error) {
            console.error('Error creating course:', error);
            message.error("Failed to create course");
            setUploading(false)

    }
    };
    const handleCancel = () => {
        onCancel();
        form.resetFields();
    }
  const handleBeforeUpload = (file:any) => {
    console.log(file)
    fileRef.current = file; // Save file for manual submit
    return false; // Prevent auto upload
  };

  return (
    <Modal
    title={selectedFormationId ? t('forms.formation.edit') : t('forms.formation.create')}
      open={open}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <div className="flex items-center justify-end gap-2">
            <Button type="default" onClick={onCancel}>{t('modal.cancel')}</Button>
            <Button type="primary" disabled={uploading} loading={uploading} onClick={handleSubmit}>
                {selectedFormationId ? t('modal.save') : t('forms.formation.create')}
            </Button>
        </div>
      ]}
      width={500}
      centered
    >
        <div style={{
            maxHeight:"800px",
            overflowY:"auto",
            marginInline:"10px"
        }}>
     
      <Form 
      form={form}
      layout="vertical" style={{
        gap:"0px"
      }}>
        <Form.Item 
        rules={[{required:true,message:t('forms.formation.titleRequired')}]}
        label={t('forms.formation.title')} name="title" style={{marginBottom: 8}}>
          <Input placeholder={t('forms.formation.titlePlaceholder')} />
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:t('forms.formation.descriptionRequired')}]}
        label={t('forms.formation.description')} name="description" style={{marginBottom: 8}}>
          <Input.TextArea placeholder={t('forms.formation.descriptionPlaceholder')} />
        </Form.Item>
          <Form.Item 
          rules={[{required:true,message:t('forms.formation.locationRequired')}]}
          label={t('forms.formation.location')} name="location" style={{marginBottom: 8}}>
            <Input placeholder={t('forms.formation.locationPlaceholder')} />
          </Form.Item>
          <Form.Item 
          rules={[{required:true,message:t('forms.formation.dateRequired')}]}
          label={t('forms.formation.date')} name="date" style={{marginBottom: 8}}>
           <DatePicker format="YYYY-MM-DD HH:mm" showTime placeholder={t('forms.formation.datePlaceholder')}/>
          </Form.Item>
        <Form.Item 
        rules={[{required:true,message:t('forms.formation.priceRequired')}]}
        label={t('forms.formation.price')} name="price" style={{marginBottom: 8}}>
          <Input type="number" min={0} placeholder={t('forms.formation.pricePlaceholder')} />
        </Form.Item>
        <Form.Item label="Thumbnail" name="thumbnail">
        
            <Upload
          beforeUpload={handleBeforeUpload}
          accept="image/*"
          maxCount={1}
          showUploadList={{ showRemoveIcon: true }}
          onRemove={() => {fileRef.current = null}}
          disabled={fileRef.current ? true : false}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
        </Form.Item>
      </Form>
      </div>

    </Modal>
  );
};
