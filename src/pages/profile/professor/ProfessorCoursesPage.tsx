import Sider from '@/components/Sider'
import React, { useState } from 'react'
import SideBar from './Components/Sidebar'
import { useCreate, useDelete, useGetIdentity, useList } from '@refinedev/core';
import { Upload, Button, message, Card, UploadProps, Table, TableColumnType, Col, Row, Tooltip, Modal, Switch } from 'antd';
import { DeleteOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import ProfessorPageLayout from '@/layouts/ProfessorPageLayout';
import { CreateCourse } from './Components/CreateCourse';
import { TableRowSelection } from 'antd/es/table/interface';
const { Dragger } = Upload;

export const ProfessorCoursesPage = () => {
  const [activePage, setActivePage] = useState('content');
  const [activeTab, setActiveTab] = useState('videos');
  const [createModal, setCreateModal] = useState(false);
  const[selectedCourseId,setSelectedCourseId]=useState<number | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const {mutate :deleteCourse } =useDelete();
  const {data:user}=useGetIdentity<any>();
  const {mutate :uploadVideo } =useCreate();
  const {mutate :toggleCourse } =useCreate();
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

  
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows:any) => {
    setSelectedCourseId(selectedRowKeys[0] as number)
    setSelectedRowKeys(selectedRowKeys)

  }
  const rowSelectionObj: TableRowSelection<any> = {
    type: "radio",
    onChange: onSelectChange,
    selectedRowKeys: selectedRowKeys
  }
  const columns:TableColumnType<any>[] = [
    {
      title: '-',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Thumbnail',
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Lessons Count',
      dataIndex: 'lessonCount',
      key: 'lessonCount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
        <Tooltip title="Delete Course">
        <Button
        type="text"
        danger
        icon={<DeleteOutlined/>}
        onClick={() => handleDelete(record.id)}
        size='large'
        />
    </Tooltip>
    <Tooltip title="Toggle Active">
      <Switch
      size='small'
       checkedChildren="On"
       unCheckedChildren="Off"
        checked={record.isActive}
        onChange={(checked)=>handleToggleActive(record.id,checked)}
      />
    </Tooltip>
        </>
      )
    },
    
    
  ];
  const handleToggleActive = (id:number,isActive:boolean) => {
    toggleCourse({
      resource:"courses/toggle-course",
      values:{id,isActive}
    },{
      onSuccess:()=>{
        message.success("Course active status toggled successfully")
        refetch()
      },
      onError:()=>{
        message.error("Failed to toggle course active status")
      }
    })
  }
  const handleDelete = (id:number) => {
    Modal.confirm({
      centered:true,
      title:"Delete Course",
      type:"error",
      content:"Are you sure you want to delete this course? lessons related to this course will also be deleted",
      onOk:()=>{
        deleteCourse({
          resource:"courses",
          id,
          values:{
            id
          }
        }, {
          onSuccess:()=>{
            message.success("Course deleted successfully")
            refetch()
          },
          onError:()=>{
            message.error("Failed to delete course")
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
        >Create New Course</Button>
      </Col>
      <Col >
        <Button
        onClick={()=>{
          if(!selectedCourseId){
            message.warning("Please select a course to edit")
            return
          }
          setCreateModal(true)
        }}
        >Edit Course</Button>
      </Col>
    </Row>

    <Table
    dataSource={courses?.data}
    columns={columns}
    rowSelection={rowSelectionObj}
    rowKey="id"
    />
  {createModal && 
  <CreateCourse
   open={createModal}
    onCancel={()=>{
      setCreateModal(false)
      refetch()
      setSelectedCourseId(undefined)
      setSelectedRowKeys([])
    }}
    selectedCourseId={selectedCourseId}
    />}

        </>
  )
}
 