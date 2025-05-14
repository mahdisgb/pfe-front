import Sider from '@/components/Sider'
import React, { useState } from 'react'
import SideBar from './Components/Sidebar'
import { useCreate, useDelete, useGetIdentity, useList } from '@refinedev/core';
import { Upload, Button, message, Card, UploadProps, Table, TableColumnType, Col, Row, Tooltip, Modal, Switch, Select } from 'antd';
import { DeleteOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/es/table/interface';
import { CreateLesson } from './Components/CreateLesson';
const { Dragger } = Upload;

export const ProfessorLessonsPage = () => {
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
    // pagination:{
    //   mode:"client"
    // },
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
      title: 'Course',
      dataIndex: ['course', 'title'],
      key: 'course',
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
    toggleLesson({
      resource:"lessons/toggle",
      values:{id,isActive}
    },{
      onSuccess:()=>{
        message.success("Course active status toggled successfully")
        refetch()
      },
      onError:()=>{
        message.error("Failed to toggle lesson active status")
      }
    })
  }
  const handleDelete = (id:number) => {
    Modal.confirm({
      centered:true,
      title:"Delete Lesson",
      type:"error",
      content:"Are you sure you want to delete this lesson?",
      onOk:()=>{
        deleteLesson({
          resource:`lessons/${id}`,
          id,
          values:{
            id
          }
        }, {
          onSuccess:()=>{
            message.success("Lesson deleted successfully")
            refetch()
          },
          onError:()=>{
            message.error("Failed to delete lesson")
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
        >Create New Lesson</Button>
      </Col>
      <Col >
        <Button
        onClick={()=>{
          if(!selectedLessonId){
            message.warning("Please select a lesson to edit")
            return
          }
          setCreateModal(true)
        }}
        >Edit Lesson</Button>
      </Col>
      <Col>
      <Select
            placeholder="filter by course"
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
/**
 * 
 * import Sider from '@/components/Sider'
import React, { useState } from 'react'
import SideBar from './Components/Sidebar'
import { useCreate, useDelete, useGetIdentity, useList, useTranslation } from '@refinedev/core';
import { Upload, Button, message, Card, UploadProps, Table, TableColumnType, Col, Row, Tooltip, Modal, Switch, Select, Space, Tag } from 'antd';
import { DeleteOutlined, InboxOutlined, UploadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ProfessorPageLayout } from '@/layouts/ProfessorPageLayout';
import { TableRowSelection } from 'antd/es/table/interface';
import { CreateLesson } from './Components/CreateLesson';
const { Dragger } = Upload;

export const ProfessorLessonsPage = () => {
  const { translate: t } = useTranslation();
  const [activePage, setActivePage] = useState('content');
  const [activeTab, setActiveTab] = useState('videos');
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<number | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(undefined);

  const {mutate :deleteLesson } =useDelete();
  const {data:user}=useGetIdentity<any>();
  const {mutate :uploadVideo } =useCreate();
  const {mutate :toggleLesson } =useCreate();
  const {data:lessons,refetch} = useList({
    resource:`lessons/professor`,
    // pagination:{
    //   mode:"client"
    // },
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
      title: t('forms.lesson.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('forms.lesson.course'),
      dataIndex: 'course',
      key: 'course',
      render: (course: any) => course?.title,
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {t(`common.statuses.${status}`)}
        </Tag>
      ),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedLessonId(record.id);
              setIsCreateModalVisible(true);
            }}
          >
            {t('common.edit')}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            {t('common.delete')}
          </Button>
        </Space>
      ),
    },
  ];
  const handleToggleActive = (id:number,isActive:boolean) => {
    toggleLesson({
      resource:"lessons/toggle",
      values:{id,isActive}
    },{
      onSuccess:()=>{
        message.success("Course active status toggled successfully")
        refetch()
      },
      onError:()=>{
        message.error("Failed to toggle lesson active status")
      }
    })
  }
  const handleDelete = (id:number) => {
    Modal.confirm({
      centered:true,
      title:"Delete Lesson",
      type:"error",
      content:"Are you sure you want to delete this lesson?",
      onOk:()=>{
        deleteLesson({
          resource:`lessons/${id}`,
          id,
          values:{
            id
          }
        }, {
          onSuccess:()=>{
            message.success("Lesson deleted successfully")
            refetch()
          },
          onError:()=>{
            message.error("Failed to delete lesson")
          }
        })
      }
    })
  }
  return (
      // <ProfessorPageLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('profile.professor.lessons')}</h1>
          <Space>
            <Select
              placeholder={t('profile.professor.filterByCourse')}
              style={{ width: 200 }}
              onChange={setSelectedCourseId}
              allowClear
            >
              {courses?.data?.map((course:any)=>(
                  <Select.Option value={course.id} key={course.id}>
                      {course.title}
                  </Select.Option>
              ))}
            </Select>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setSelectedLessonId(undefined);
                setIsCreateModalVisible(true);
              }}
            >
              {t('profile.professor.createNewLesson')}
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={lessons?.data}
          rowSelection={rowSelectionObj}
          rowKey="id"
        />

        <CreateLesson
          open={isCreateModalVisible}
          onCancel={() => {
            setIsCreateModalVisible(false);
            refetch();
            setSelectedLessonId(undefined);
            setSelectedRowKeys([]);
          }}
          selectedLessonId={selectedLessonId}
        />
      </div>
  )
}
 
 */
 