import { DeleteOutlined } from '@ant-design/icons';
import { useDelete, useGetIdentity, useList } from '@refinedev/core';
import { Button, message, Table, TableColumnType, Tooltip, Upload } from 'antd';
import React, { useState } from 'react';
// import ProfessorPageLayout from '@/layouts/ProfessorPageLayout';
import { useTranslation } from '@refinedev/core';
import { TableRowSelection } from 'antd/es/table/interface';
import { ProcessRequestModal } from './components/ProcessRequestModal';
const { Dragger } = Upload;

export default function AdminManageUsers () {
  const { translate: t } = useTranslation();
  const[selectedRequest,setSelectedRequest]=useState<any | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const[processModal,setProcessModal]=useState<boolean>(false);

    const {mutate :deleteUser } =useDelete();
  const {data:user}=useGetIdentity<any>();
  const {data:users,refetch} = useList({
    resource:"auth/users",
  })
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows:any) => {
    setSelectedRequest(selectedRows[0])
    setSelectedRowKeys(selectedRowKeys)

  }
  const rowSelectionObj: TableRowSelection<any> = {
    type: "radio",
    getCheckboxProps: (record) => ({
      disabled: record.status !== "pending",
    }),
    onChange: onSelectChange,
    selectedRowKeys: selectedRowKeys
  }
  const columns:TableColumnType<any>[] = [
    {
      title: t('profile.admin.users.table.requestId'),
      key: 'id',
      render: (text, record) => record.id,
    },
    {
      title: t('profile.admin.users.table.name'),
      key: 'name',
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: t('profile.admin.users.table.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('profile.admin.users.table.status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('profile.admin.users.table.roles'),
      dataIndex: 'roles',
      key: 'roles',
      render: (text, record) => record.roles.join(', ')
    },
    {
      title: t('profile.admin.users.table.actions'),
      key: 'actions',
      render: (text, record) => (
        <>
          <Tooltip title={t('profile.admin.users.delete')}>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined/>}
              onClick={() => handleDelete(record.id)}
              size='large'
            />
          </Tooltip>
        </>
      )
    }
  ];
  const handleDelete = async (id: number) => {
    try {
      await deleteUser({
        resource: `auth/user/${id}`,
        id,
      },{
        onSuccess:()=>{
          message.success(t('profile.admin.users.deleteSuccess'));
          refetch();
        },
        onError:()=>{
          message.error(t('profile.admin.users.deleteError'));
        }
      });
    } catch (error) {
      message.error(t('profile.admin.users.deleteError'));
    }
  }
  
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
    dataSource={users?.data}
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
      setSelectedRequest(undefined)
      setSelectedRowKeys([])
    }}
    selectedRequest={selectedRequest}
    />} 

    {/* {activePage !== 'content' && (
          <div className="h-full flex items-center justify-center">
            <p className="text-xl text-youtube-text">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)} page would be displayed here
            </p>
          </div>
        )} */}
        </>


  )
}
 