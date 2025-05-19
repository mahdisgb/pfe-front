import React, { useState } from 'react'
import { useCreate, useDelete, useGetIdentity, useList } from '@refinedev/core';
import { Upload, Button, message, Card, UploadProps, Table, TableColumnType, Col, Row, Tooltip, Modal, Switch, Space } from 'antd';
import { DeleteOutlined, InboxOutlined, UploadOutlined, EyeOutlined } from '@ant-design/icons';
// import ProfessorPageLayout from '@/layouts/ProfessorPageLayout';
import { TableRowSelection } from 'antd/es/table/interface';
import { ProcessRequestModal } from './components/ProcessRequestModal';
import { useTranslation } from '@refinedev/core';
const { Dragger } = Upload;

export default function AdminManageChat () {
  const { translate: t } = useTranslation();
  const[selectedRequest,setSelectedRequest]=useState<any | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const[processModal,setProcessModal]=useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {mutate :deleteCourse } =useDelete();
  const {data:user}=useGetIdentity<any>();
  const {data:messages,refetch} = useList({
    resource:"chat/room/course-1",
    pagination:{
        mode:"off",
    },
    meta:{
      enabled:!!user?.id
    },
  })

  
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows:any) => {
    setSelectedRequest(selectedRows[0])
    setSelectedRowKeys(selectedRowKeys)

  }

  const handleDelete = async (id: number) => {
    try {
      await deleteCourse({
        resource: 'messages',
        id,
      });
      message.success(t('profile.admin.chat.deleteSuccess'));
      refetch();
    } catch (error) {
      message.error(t('profile.admin.chat.deleteError'));
    }
  };

  const columns:TableColumnType<any>[] = [
    {
      title: '-',
      key: 'id',
      render: (text, record,idx) => idx+1,
    },
    {
      title: 'Name',
      key: 'name',
      render: (text, record) => `${record.user.firstName} ${record.user.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: 'Chat Message',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedMessage(record);
              setIsModalVisible(true);
            }}
          >
            {t('profile.admin.chat.view')}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              Modal.confirm({
                title: t('profile.admin.chat.deleteConfirm'),
                content: t('profile.admin.chat.deleteConfirmMessage'),
                okText: t('profile.admin.chat.delete'),
                cancelText: t('profile.admin.chat.cancel'),
                onOk: () => handleDelete(record.id),
              });
            }}
          >
            {t('profile.admin.chat.delete')}
          </Button>
        </Space>
      ),
    },
  ];
  
  return (
    <>
    {/* <Row style={{marginBottom:"20px"}} justify={"end"} gutter={16}>
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
    </Row> */}

    <Table
    dataSource={messages?.data}
    columns={columns}
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
      title={t('profile.admin.chat.messageDetails')}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      {selectedMessage && (
        <div>
          <p><strong>{t('profile.admin.chat.sender')}:</strong> {selectedMessage.user?.name}</p>
          <p><strong>{t('profile.admin.chat.room')}:</strong> {selectedMessage.room?.name}</p>
          <p><strong>{t('profile.admin.chat.time')}:</strong> {new Date(selectedMessage.timeAdded).toLocaleString()}</p>
          <p><strong>{t('profile.admin.chat.message')}:</strong></p>
          <p>{selectedMessage.content}</p>
        </div>
      )}
    </Modal>
        </>
  )
}
 