import React, { useState } from 'react'
import { useCreate, useDelete, useGetIdentity, useList } from '@refinedev/core';
import { Upload, Button, message, Card, UploadProps, Table, TableColumnType, Col, Row, Tooltip, Modal, Switch, Space, Tag } from 'antd';
import { DeleteOutlined, InboxOutlined, UploadOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
// import ProfessorPageLayout from '@/layouts/ProfessorPageLayout';
import { TableRowSelection } from 'antd/es/table/interface';
import { ProcessRequestModal } from './components/ProcessRequestModal';
import { useTranslation } from '@refinedev/core';
const { Dragger } = Upload;

export default function AdminCoursesPage () {
  const { translate: t } = useTranslation();
  const[selectedRequest,setSelectedRequest]=useState<any | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const[processModal,setProcessModal]=useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {mutate :deleteCourse } =useDelete();
  const {mutate :toggleCourse } =useCreate();
  const {data:user}=useGetIdentity<any>();
  const {data:courses,refetch} = useList({
    resource:"courses",
  })

  
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows:any) => {
    setSelectedCourse(selectedRows[0])
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
      title:t('profile.admin.courses.title'),
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
      title: t('profile.admin.courses.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('profile.admin.courses.professor'),
      dataIndex: 'professor',
      key: 'professor',
      render: (text, record) => record.professor?.firstName + " " + record.professor?.lastName,
    },
    {
      title: t('profile.admin.courses.status'),
      dataIndex: 'isActive',
      key: 'status',
      render: (text, record) => record.isActive ? <Tag color="green">{t('profile.admin.courses.active')}</Tag> : <Tag color="red">{t('profile.admin.courses.inactive')}</Tag>,
    },
    {
      title: t('profile.admin.courses.actions'),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
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
        </Space>
      ),
    },
  ];
  const handleToggleActive = (id:number,isActive:boolean) => {
    toggleCourse({
      resource:"courses/toggle",
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
  const handleDelete = async (id: number) => {
    try {
      await deleteCourse({
        resource: 'courses',
        id,
        values:{id}
      },{
        onSuccess:()=>{
          message.success(t('profile.admin.courses.deleteSuccess'));
          refetch();
        },
        onError:()=>{
          message.error(t('profile.admin.courses.deleteError'));
        }
      });
    } catch (error) {
      message.error(t('profile.admin.courses.deleteError'));
    }
  };
  console.log(selectedCourse)
  return (
    <>
    {/* <Row style={{marginBottom:"20px"}} justify={"end"} gutter={16}>
      <Col >
        <Button
        onClick={()=>{
          if(!selectedCourse){
            message.warning("Please select a request to process")
            return
          }
          setProcessModal(true)
        }}
        >Process Request</Button>
      </Col>
    </Row> */}

    <Table
    dataSource={courses?.data}
    columns={columns}
    // rowSelection={rowSelectionObj}
    rowKey="id"
    />
   {processModal && 
  <ProcessRequestModal
   open={processModal}
    onCancel={()=>{
      setProcessModal(false)
      refetch()
      setSelectedCourse(undefined)
      setSelectedRowKeys([])
    }}
    selectedRequest={selectedCourse}
    />} 

    <Modal
      title={t('profile.admin.courses.courseDetails')}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      {selectedCourse && (
        <div>
          <p><strong>{t('profile.admin.courses.title')}:</strong> {selectedCourse.title}</p>
          <p><strong>{t('profile.admin.courses.professor')}:</strong> {selectedCourse.professor?.name}</p>
          <p><strong>{t('profile.admin.courses.description')}:</strong> {selectedCourse.description}</p>
          <p><strong>{t('profile.admin.courses.enrollments')}:</strong> {selectedCourse.enrollmentCount}</p>
          <p><strong>{t('profile.admin.courses.status')}:</strong> {selectedCourse.status}</p>
        </div>
      )}
    </Modal>

    {/* {activePage !== 'content' && (
          <div className="h-full flex items-center justify-center">
            <p className="text-xl text-youtube-text">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)} page would be displayed here
            </p>
          </div>
        )} */}
        {/*  <div className=' w-full flex items-center justify-center'>
        <div className="flex flex-col gap-4">
           <Card 
          style={{
            // width:"500px",
            // height:"500px",
            display:"flex"
            ,alignItems:"center",
            justifyContent:"center"
          }}
          styles={{body:{
            padding:0
          }}}>
          
      <Dragger height={300} {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
      </Card> 
    </div>
        </div>*/}
        </>


  )
}
 