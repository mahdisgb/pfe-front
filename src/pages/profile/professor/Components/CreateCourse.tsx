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
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import type { UploadFile } from 'antd/es/upload/interface';

type CreateCourseProps = {
  open: boolean,
  onCancel: () => void,
  selectedCourseId: number | undefined
};
export const CreateCourse = ({ open, onCancel, selectedCourseId }: CreateCourseProps) => {
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
    const {data:course,isFetched} = useOne({
        resource:"courses",
        id:selectedCourseId,
        meta:{
          enabled:!!selectedCourseId
        }
      })
    const fileRef = React.useRef(null);
    const { translate: t } = useTranslation();
    useEffect(()=>{
      if(isFetched && course){
        console.log(course)
        form.setFieldsValue({
          title:course?.data?.title,
          description:course?.data?.description,
          categoryId:course?.data?.categoryId,
          thumbnail:course?.data?.thumbnail,
          price:course?.data?.price
        })
      }},[isFetched,course])
    const handleSubmit = async () => {
        if(selectedCourseId){
            try {
                const values = await form.validateFields();
                // if (!fileRef.current)  {
                //     message.error("Please upload a thumbnail");
                //     return;
                // }
                // const binary = await fileRef.current.arrayBuffer();
                const formData = new FormData();
                if (fileRef.current) {
                    formData.append('thumbnail', fileRef.current);
                };
                formData.append('id', selectedCourseId.toString());
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('categoryId', values.categoryId);
                formData.append('professorId', user?.id);
                formData.append('price', values.price);
                setUploading(true)
                await updateCourse({
                    resource: "courses",
                    id:selectedCourseId,
                    values: formData,
                    meta: {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                });
                setUploading(false)
    
                message.success("Course updated successfully");
                handleCancel();
    
            } catch (error) {
                console.error('Error creating course:', error);
                message.error("Failed to create course");
                setUploading(false)
    
            }
       }else{
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
            formData.append('categoryId', values.categoryId);
            formData.append('professorId', user?.id);
            formData.append('thumbnail', fileRef.current);
            formData.append('price', values.price);

            setUploading(true)
            await createCourse({
                resource: "courses",
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
    title={selectedCourseId ? t('forms.course.edit') : t('forms.course.create')}
      open={open}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <div className="flex items-center justify-end gap-2">
            <Button type="default" onClick={onCancel}>{t('modal.cancel')}</Button>
            <Button type="primary" disabled={uploading} loading={uploading} onClick={handleSubmit}>
                {selectedCourseId ? t('modal.save') : t('forms.course.create')}
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
      {selectedCourseId ?  isFetched && course ?
      <Form 
      form={form}
      layout="vertical" style={{
        gap:"0px"
      }}>
        <Form.Item 
        rules={[{required:true,message:t('forms.course.titleRequired')}]}
        label={t('forms.course.title')} name="title" style={{marginBottom: 8}}>
          <Input placeholder={t('forms.course.titlePlaceholder')} />
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:t('forms.course.descriptionRequired')}]}
        label={t('forms.course.description')} name="description" style={{marginBottom: 8}}>
          <Input.TextArea placeholder={t('forms.course.descriptionPlaceholder')} />
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:t('forms.course.categoryRequired')}]}
        label={t('forms.course.category')} name="categoryId" style={{marginBottom: 8}}>
          <Select
            placeholder={t('forms.course.categoryPlaceholder')}
          >
            {categories?.data?.map((category:any)=>(
                <Select.Option value={category.id} key={category.id}>
                    {category.name}
                </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:t('forms.course.priceRequired')}]}
        label={t('forms.course.price')} name="price" style={{marginBottom: 8}}>
          <Input type="number" min={0} placeholder={t('forms.course.pricePlaceholder')} />
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
      :<Skeleton active />  :  
      <Form 
      form={form}
      layout="vertical" style={{
        gap:"0px"
      }}>
        <Form.Item 
        rules={[{required:true,message:t('forms.course.titleRequired')}]}
        label={t('forms.course.title')} name="title" style={{marginBottom: 8}}>
          <Input placeholder={t('forms.course.titlePlaceholder')} />
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:t('forms.course.descriptionRequired')}]}
        label={t('forms.course.description')} name="description" style={{marginBottom: 8}}>
          <Input.TextArea placeholder={t('forms.course.descriptionPlaceholder')} />
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:t('forms.course.categoryRequired')}]}
        label={t('forms.course.category')} name="categoryId" style={{marginBottom: 8}}>
          <Select
            placeholder={t('forms.course.categoryPlaceholder')}
          >
            {categories?.data?.map((category:any)=>(
                <Select.Option value={category.id} key={category.id}>
                    {category.name}
                </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:t('forms.course.priceRequired')}]}
        label={t('forms.course.price')} name="price" style={{marginBottom: 8}}>
          <Input type="number" min={0} placeholder={t('forms.course.pricePlaceholder')} />
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
      </Form>}
      </div>

    </Modal>
  );
};
