import { useGetIdentity, useList, useUpdate } from '@refinedev/core';
import { Button, Col, message, Row, Table, TableColumnType, Upload } from 'antd';
import React, { useState } from 'react';
// import ProfessorPageLayout from '@/layouts/ProfessorPageLayout';
import { useTranslation } from '@refinedev/core';
import { TableRowSelection } from 'antd/es/table/interface';
import { ProcessRequestModal } from './components/ProcessRequestModal';
const { Dragger } = Upload;

export default function AdminRequestsPage () {
  const { translate: t } = useTranslation();
  const[selectedRequest,setSelectedRequest]=useState<any | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const[processModal,setProcessModal]=useState<boolean>(false);
  const { mutateAsync: updateRequest } = useUpdate();

  const {data:user}=useGetIdentity<any>();
  const {data:courses,refetch} = useList({
    resource:"admin/professor-requests",
    meta:{
      enabled:!!user?.id
    },
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
      title: t('profile.admin.requests.table.requestId'),
      key: 'id',
      render: (text, record) => record.id,
    },
    {
      title: t('profile.admin.requests.table.name'),
      key: 'name',
      render: (text, record) => `${record.user.firstName} ${record.user.lastName}`,
    },
    {
      title: t('profile.admin.requests.table.email'),
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: t('profile.admin.requests.table.status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('profile.admin.requests.table.adminNotes'),
      dataIndex: 'adminNotes',
      key: 'adminNotes',
    },
    {
      title: t('profile.admin.requests.table.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: t('profile.admin.requests.table.actions'),
      key: 'actions',
    }
  ];
  
  const handleApprove = async (id: number) => {
    try {
      await updateRequest({
        resource: 'requests',
        id,
        values: { status: 'approved' },
      });
      message.success(t('profile.admin.requests.approveSuccess'));
      refetch();
    } catch (error) {
      message.error(t('profile.admin.requests.approveError'));
    }
  };

  const handleReject = async (id: number) => {
    try {
      await updateRequest({
        resource: 'requests',
        id,
        values: { status: 'rejected' },
      });
      message.success(t('profile.admin.requests.rejectSuccess'));
      refetch();
    } catch (error) {
      message.error(t('profile.admin.requests.rejectError'));
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
        >{t('profile.admin.requests.processRequest')}</Button>
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
 