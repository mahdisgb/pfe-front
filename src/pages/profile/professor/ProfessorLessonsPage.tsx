import { DeleteOutlined } from '@ant-design/icons';
import { useCreate, useDelete, useGetIdentity, useList, useTranslation } from '@refinedev/core';
import { Button, Col, message, Modal, Row, Select, Switch, Table, TableColumnType, Tooltip, Upload } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { CreateLesson } from './Components/CreateLesson';
const { Dragger } = Upload;

export const ProfessorLessonsPage = () => {
  const {translate:t}=useTranslation();
  const [activePage, setActivePage] = useState('content');
  const [activeTab, setActiveTab] = useState('videos');
  const [createModal, setCreateModal] = useState(false);
  const[selectedLessonId,setSelectedLessonId]=useState<number | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedCourseId,setSelectedCourseId]=useState<number | undefined>(undefined);

  const {mutate :deleteLesson } =useDelete();
  const {data:user}=useGetIdentity<any>();
  const {mutate :uploadVideo } =useCreate();
  const {mutate :toggleLesson } =useCreate();
  const {data:lessons,refetch} = useList({
    resource:`lessons/professor`,
   
    filters:[{
      field:"professorId",
      operator:"eq",
      value:user?.id
    },{
      field:"courseId",
      operator:"eq",
      value:selectedCourseId
    }],
    meta:{
      enabled:!!user?.id
    }
  })
  const {data:courses} = useList({
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
  
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows:any) => {
    setSelectedLessonId(selectedRowKeys[0] as number)
    setSelectedRowKeys(selectedRowKeys)
  }
  const rowSelectionObj: TableRowSelection<any> = {
    type: "radio",
    onChange: onSelectChange,
    selectedRowKeys: selectedRowKeys
  }
  const columns:TableColumnType<any>[] = [
    {
      title: t('profile.professor.lessons.table.index'),
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: t('profile.professor.lessons.table.thumbnail'),
      key: 'thumbnail',
      render: (text, record) => (
        <img 
          src={record.thumbnail || '/placeholder.png'} 
          alt={record.title}
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: t('profile.professor.lessons.table.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('profile.professor.lessons.table.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('profile.professor.lessons.table.course'),
      dataIndex: ['course', 'title'],
      key: 'course',
    },
    {
      title: t('profile.professor.lessons.table.actions'),
      key: 'actions',
      render: (text, record) => (
        <>
        <Tooltip title={t('profile.professor.lessons.actions.delete')}>
        <Button
        type="text"
        danger
        icon={<DeleteOutlined/>}
        onClick={() => handleDelete(record.id)}
        size='large'
        />
    </Tooltip>
    <Tooltip title={t('profile.professor.lessons.actions.toggleActive')}>
      <Switch
      size='small'
       checkedChildren={t('profile.professor.lessons.actions.on')}
       unCheckedChildren={t('profile.professor.lessons.actions.off')}
        checked={record.isActive}
        onChange={(checked)=>handleToggleActive(record.id,checked)}
      />
    </Tooltip>
        </>
      )
    },
  ];
  const handleToggleActive = (id:number,isActive:boolean) => {
    toggleLesson({
      resource:"lessons/toggle",
      values:{id,isActive}
    },{
      onSuccess:()=>{
        message.success(t('profile.professor.lessons.messages.toggleSuccess'))
        refetch()
      },
      onError:()=>{
        message.error(t('profile.professor.lessons.messages.toggleError'))
      }
    })
  }
  const handleDelete = (id:number) => {
    Modal.confirm({
      centered:true,
      title:t("modal.deleteLesson"),
      type:"error",
      content:t("modal.deleteLessonConfirm"),
      onOk:()=>{
        deleteLesson({
          resource:`lessons/${id}`,
          id,
          values:{
            id
          }
        }, {
          onSuccess:()=>{
            message.success(t('profile.professor.lessons.messages.deleteSuccess'))
            refetch()
          },
          onError:()=>{
            message.error(t('profile.professor.lessons.messages.deleteError'))
          }
        })
      }
    })
  }
  return (
     
   <>
    <Row style={{marginBottom:"20px"}}  justify={"end"} gutter={16}>
      <Col >
        <Button
        onClick={()=>setCreateModal(true)}
        type='primary'
        >{t('forms.lesson.create')}</Button>
      </Col>
      <Col >
        <Button
        onClick={()=>{
          if(!selectedLessonId){
            message.warning(t("modal.selectLesson"))
            return
          }
          setCreateModal(true)
        }}
        >{t('forms.lesson.edit')}</Button>
      </Col>
      <Col>
      <Select
            placeholder={t("forms.lesson.filterByCourse")}
            style={{width:"200px"}}
            onChange={(value)=>setSelectedCourseId(value)}
            allowClear
          >
            {courses?.data?.map((course:any)=>(
                <Select.Option value={course.id} key={course.id}>
                    {course.title}
                </Select.Option>
            ))}
          </Select></Col>
    </Row>

    <Table
    dataSource={lessons?.data}
    columns={columns}
    rowSelection={rowSelectionObj}
    rowKey="id"
    />
  {createModal && 
  <CreateLesson
   open={createModal}
    onCancel={()=>{
      setCreateModal(false)
      refetch()
      setSelectedLessonId(undefined)
      setSelectedRowKeys([])
    }}
    selectedLessonId={selectedLessonId}
    />}
  </>
  )
}