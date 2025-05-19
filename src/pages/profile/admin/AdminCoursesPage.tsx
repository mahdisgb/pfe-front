import Sider from '@/components/Sider'
import React, { useState } from 'react'
import { useCreate, useDelete, useGetIdentity, useList } from '@refinedev/core';
import { Upload, Button, message, Card, UploadProps, Table, TableColumnType, Col, Row, Tooltip, Modal, Switch, Space } from 'antd';
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
    // setSelectedCourseId(selectedRowKeys[0] as number)
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
      title: t('profile.admin.courses.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('profile.admin.courses.professor'),
      dataIndex: ['professor', 'name'],
      key: 'professor',
    },
    {
      title: t('profile.admin.courses.enrollments'),
      dataIndex: 'enrollmentCount',
      key: 'enrollments',
    },
    {
      title: t('profile.admin.courses.status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('profile.admin.courses.actions'),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedCourse(record);
              setIsModalVisible(true);
            }}
          >
            {t('profile.admin.courses.view')}
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              // Handle edit
            }}
          >
            {t('profile.admin.courses.edit')}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              Modal.confirm({
                title: t('profile.admin.courses.deleteConfirm'),
                content: t('profile.admin.courses.deleteConfirmMessage'),
                okText: t('profile.admin.courses.delete'),
                cancelText: t('profile.admin.courses.cancel'),
                onOk: () => handleDelete(record.id),
              });
            }}
          >
            {t('profile.admin.courses.delete')}
          </Button>
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
      });
      message.success(t('profile.admin.courses.deleteSuccess'));
      refetch();
    } catch (error) {
      message.error(t('profile.admin.courses.deleteError'));
    }
  };
  
  return (
    <>
    <Row style={{marginBottom:"20px"}} justify={"end"} gutter={16}>
      <Col >
        <Button
        onClick={()=>{
          if(!selectedRequest){
            message.warning("Please select a request to process")
            return
          }
          setProcessModal(true)
        }}
        >Process Request</Button>
      </Col>
    </Row>

    <Table
    dataSource={courses?.data}
    columns={columns}
    rowSelection={rowSelectionObj}
    rowKey="id"
    />
   {processModal && 
  <ProcessRequestModal
   open={processModal}
    onCancel={()=>{
      setProcessModal(false)
      refetch()
      setSelectedRequest(undefined)
      setSelectedRowKeys([])
    }}
    selectedRequest={selectedRequest}
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
 