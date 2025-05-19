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
  selectedLessonId: number | undefined
};
  export const CreateLesson = ({ open, onCancel, selectedLessonId }: CreateCourseProps) => {    const [form] = Form.useForm();
    const[uploading,setUploading]=useState(false);
    const {translate:t}=useTranslation();
    const {data:user}=useGetIdentity<any>();

    const {mutateAsync:createLesson} =useCreate();
    const {mutateAsync:updateLesson} =useUpdate();
    const {data:courses,refetch} = useList({
        resource:"courses/professor/",
        pagination:{
          mode:"client"
        },
        filters:[{
          field:"professorId",
          operator:"eq",
          value:user?.id
        }],
        meta:{
          enabled:!!user?.id
        }
      })
    
      const {data:lesson,isFetched} = useOne({
          resource:"lessons",
          id:selectedLessonId,
          meta:{
            enabled:!!selectedLessonId
          }
        })
    const thumbnailRef = React.useRef(null);
    const videoRef = React.useRef(null);
    useEffect(()=>{
      if(isFetched && lesson){
        console.log(lesson)
        form.setFieldsValue({
          title:lesson?.data?.title,
          description:lesson?.data?.description,
          courseId:lesson?.data?.courseId,
          // thumbnail:lesson?.data?.thumbnail
        })
      }},[isFetched,lesson])
    // useEffect(()=>{
    //   if(isFetched && course){
    //     console.log(course)
    //     form.setFieldsValue({
    //       title:course?.data?.title,
    //       description:course?.data?.description,
    //       categoryId:course?.data?.categoryId,
    //       thumbnail:course?.data?.thumbnail
    //     })
    //   }},[isFetched,course])
    const handleSubmit = async () => {
        if(selectedLessonId){
            try {
                const values = await form.validateFields();
              
                const formData = new FormData();
                // if (thumbnailRef.current) {
                //     formData.append('thumbnail', thumbnailRef.current);
                // };
                if (videoRef.current) {
                    formData.append('video', videoRef.current);
                };
                formData.append('id', selectedLessonId.toString());
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('courseId', values.courseId);
                setUploading(true)
                await updateLesson({
                    resource: `lessons/${selectedLessonId}`,
                    values: formData,
                    id:selectedLessonId,
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
            
            // if (!thumbnailRef.current) return;
            if (!videoRef.current)  {
                message.error("Please upload a Video");
                return;
            }
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('courseId', values.courseId);
            // formData.append('thumbnail', thumbnailRef.current);
            formData.append('video', videoRef.current);
            setUploading(true)
            await createLesson({
                resource: "lessons",
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
    if(file.type.startsWith('image/')){
        thumbnailRef.current = file;
    }else if(file.type.startsWith('video/')){
        videoRef.current = file;
    }
    return false; // Prevent auto upload
  };

  return (
    <Modal
    title={selectedLessonId ? "Edit Lesson" : "Create Lesson"}
      open={open}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <div className="flex items-center justify-end gap-2">
            <Button type="default" onClick={onCancel}>{t('modal.cancel')}</Button>
            <Button type="primary" disabled={uploading} loading={uploading} onClick={handleSubmit}>{selectedLessonId ? t('modal.update') : t('modal.create')}</Button>
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
      {selectedLessonId ?  isFetched && lesson ?
      <Form 
      form={form}
      layout="vertical" style={{
        gap:"0px"
      }}>
        <Form.Item 
        rules={[{required:true,message:"Title is required"}]}
        label="Title" name="title" style={{marginBottom: 8}}>
          <Input placeholder="Enter lesson title" />
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:"Description is required"}]}
        label="Description" name="description" style={{marginBottom: 8}}>
          <Input.TextArea placeholder="Enter course description" />
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:"Course is required"}]}
        label="Course" name="courseId" style={{marginBottom: 8}} >
          <Select
            placeholder="Select course"
            open={lesson ? false :true}
          >
            {courses?.data?.map((course:any)=>(
                <Select.Option value={course.id} key={course.id}>
                    {course.title}
                </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item label="Thumbnail" name="thumbnail">
            <Upload
          beforeUpload={handleBeforeUpload}
          accept="image/*"
          maxCount={1}
          showUploadList={{ showRemoveIcon: true }}
          onRemove={() => {thumbnailRef.current = null}}
            disabled={thumbnailRef.current ? true : false}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
        </Form.Item> */}
        <Form.Item label="video" name="video">
         
         <Upload
       beforeUpload={handleBeforeUpload}
       accept=".mp4,.mov,.avi,.mkv,.webm,.flv,.wmv,.m4v,.3gp,.mpeg,.mpg"
       maxCount={1}
       showUploadList={{ showRemoveIcon: true }}
       onRemove={() => {videoRef.current = null}}
       disabled={videoRef.current ? true : false}
     >
       <Button icon={<UploadOutlined />}>{t('forms.lesson.selectVideo')}</Button>
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
        rules={[{required:true,message:"Title is required"}]}
        label="Title" name="title" style={{marginBottom: 8}}>
          <Input placeholder="Enter lesson title" />
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:"Description is required"}]}
        label="Description" name="description" style={{marginBottom: 8}}>
          <Input.TextArea placeholder="Enter lesson description" />
        </Form.Item>
        <Form.Item 
        rules={[{required:true,message:"Course is required"}]}
        label="Course" name="courseId" style={{marginBottom: 8}}>
          <Select
            placeholder="Select course"
          >
            {courses?.data?.map((course:any)=>(
                <Select.Option value={course.id} key={course.id}>
                    {course.title}
                </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item label="Thumbnail" name="thumbnail">
         
            <Upload
          beforeUpload={handleBeforeUpload}
          accept="image/*"
          maxCount={1}
          showUploadList={{ showRemoveIcon: true }}
          onRemove={() => {thumbnailRef.current = null}}
        //   disabled={thumbnailRef.current ? true : false}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
        </Form.Item> */}
        <Form.Item label="video" name="video">
         
         <Upload
       beforeUpload={handleBeforeUpload}
       accept=".mp4,.mov,.avi,.mkv,.webm,.flv,.wmv,.m4v,.3gp,.mpeg,.mpg"
       maxCount={1}
       showUploadList={{ showRemoveIcon: true }}
       onRemove={() => {videoRef.current = null}}
       disabled={videoRef.current ? true : false}
     >
       <Button icon={<UploadOutlined />}>{t('forms.lesson.selectVideo')}</Button>
     </Upload>
     </Form.Item>
      </Form>}
      </div>

    </Modal>
  );
};
