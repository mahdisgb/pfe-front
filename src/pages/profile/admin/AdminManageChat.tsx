import { DeleteOutlined } from '@ant-design/icons';
import { useDelete, useGetIdentity, useList } from '@refinedev/core';
import { Button, message, Modal, Space, Table, TableColumnType, Tooltip, Upload } from 'antd';
import React, { useState } from 'react';
// import ProfessorPageLayout from '@/layouts/ProfessorPageLayout';
import { useTranslation } from '@refinedev/core';
import { ProcessRequestModal } from './components/ProcessRequestModal';
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
    // pagination:{
    //     mode:"off",
    // },
    // meta:{
    //   enabled:!!user?.id
    // },
  })

  
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows:any) => {
    setSelectedRequest(selectedRows[0])
    setSelectedRowKeys(selectedRowKeys)

  }

  const handleDelete = async (id: number) => {
    try {
      await deleteCourse({
        resource: `chat/message/${id}`,
        id,
      },{
        onSuccess:()=>{
          message.success(t('profile.admin.chat.deleteSuccess'));
          refetch();
        },
        onError:()=>{
          message.error(t('profile.admin.chat.deleteError'));
        }
      });
    
    } catch (error) {
      message.error(t('profile.admin.chat.deleteError'));
    }
  };

  const columns:TableColumnType<any>[] = [
    {
      title: t('profile.admin.chat.table.index'),
      key: 'id',
      render: (text, record,idx) => idx+1,
    },
    {
      title: t('profile.admin.chat.table.name'),
      key: 'name',
      render: (text, record) => `${record.user.firstName} ${record.user.lastName}`,
    },
    {
      title: t('profile.admin.chat.table.email'),
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: t('profile.admin.chat.table.message'),
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: t('profile.admin.chat.table.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: t('profile.admin.chat.table.actions'),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title={t('profile.admin.chat.delete')}>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined/>}
              onClick={() => handleDelete(record.id)}
              size='large'
            />
          </Tooltip>
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
 