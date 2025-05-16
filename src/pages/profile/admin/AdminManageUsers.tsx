import Sider from '@/components/Sider'
import React, { useState } from 'react'
import { useCreate, useDelete, useGetIdentity, useList } from '@refinedev/core';
import { Upload, Button, message, Card, UploadProps, Table, TableColumnType, Col, Row, Tooltip, Modal, Switch } from 'antd';
import { DeleteOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
// import ProfessorPageLayout from '@/layouts/ProfessorPageLayout';
import { TableRowSelection } from 'antd/es/table/interface';
import { ProcessRequestModal } from './components/ProcessRequestModal';
const { Dragger } = Upload;

export default function AdminManageUsers () {
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
      title: 'Request ID',
      key: 'id',
      render: (text, record) => record.id,
    },
    {
      title: 'Name',
      key: 'name',
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (text, record) => record.roles.join(', ')
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
          </>
        )
      },
  ];
  const handleDelete = (id:number) => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Are you sure you want to delete this user?',
      onOk: () => {
        deleteUser({
          resource: `auth/user/${id}`,
          id,
          values: {
            id
          }
        })   
      }
    })
  }
  
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
    dataSource={users?.data}
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
 