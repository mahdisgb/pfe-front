import { DeleteOutlined } from '@ant-design/icons';
import { useCreate, useDelete, useGetIdentity, useList, useTranslation } from '@refinedev/core';
import { Button, Col, message, Modal, Row, Switch, Table, TableColumnType, Tag, Tooltip, Upload } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { CreateFormation } from './components/CreateFormation';
const { Dragger } = Upload;

export const AdminManageFormations = () => {
  const {translate:t}=useTranslation();
  const [activePage, setActivePage] = useState('content');
  const [activeTab, setActiveTab] = useState('videos');
  const [createModal, setCreateModal] = useState(false);
  const[selectedFormationId,setSelectedFormationId]=useState<number | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const {data:user}=useGetIdentity<any>();
  const {mutate :uploadVideo } =useCreate();
  const {mutate :deleteFormation } =useDelete();
  const {mutate :toggleFormation } =useCreate();
  const {data:formations,refetch} = useList({
    resource:"formations",
   
    meta:{
      enabled:!!user?.id
    }
  })

  
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows:any) => {
    setSelectedFormationId(selectedRowKeys[0] as number)
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
      title: t('profile.admin.formations.thumbnail'),
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
      title: t('profile.admin.formations.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('profile.admin.formations.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('profile.admin.formations.location'),
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: t('profile.admin.requests.status'),
      dataIndex: 'isActive',
      key: 'status',
      render: (text, record) => record.isActive ? <Tag color="green">{t('profile.admin.courses.active')}</Tag> : <Tag color="red">{t('profile.admin.courses.inactive')}</Tag>,
    },
    {
      title: t('profile.admin.formations.actions'),
      key: 'actions',
      render: (text, record) => (
        <>
          <Tooltip title={t('profile.admin.formations.delete')}>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              size='large'
            />
          </Tooltip>
          <Tooltip title={t('profile.admin.formations.toggleActive')}>
            <Switch
              size='small'
              checkedChildren={t('profile.admin.formations.active')}
              unCheckedChildren={t('profile.admin.formations.inactive')}
              checked={record.isActive}
              onChange={(checked) => handleToggleActive(record.id, checked)}
            />
          </Tooltip>
        </>
      )
    },
  ];

  const handleToggleActive = (id: number, isActive: boolean) => {
    toggleFormation({
      resource: "formations/toggle",
      values: { id, isActive }
    }, {
      onSuccess: () => {
        message.success(t('profile.admin.formations.toggleSuccess'))
        refetch()
      },
      onError: () => {
        message.error(t('profile.admin.formations.toggleError'))
      }
    })
  }

  const handleDelete = (id: number) => {
    Modal.confirm({
      centered: true,
      title: t('profile.admin.formations.deleteTitle'),
      type: "error",
      content: t('profile.admin.formations.deleteConfirm'),
      onOk: () => {
        deleteFormation({
          resource: "formations",
          id,
          values: {
            id
          }
        }, {
          onSuccess: () => {
            message.success(t('profile.admin.formations.deleteSuccess'))
            refetch()
          },
          onError: () => {
            message.error(t('profile.admin.formations.deleteError'))
          }
        })
      }
    })
  }

  return (
    <>
      <Row style={{ marginBottom: "20px" }} justify={"end"} gutter={16}>
        <Col>
          <Button
            onClick={() => setCreateModal(true)}
            type='primary'
          >
            {t('profile.admin.formations.create')}
          </Button>
        </Col>
        {/* <Col>
          <Button
            onClick={() => {
              if (!selectedFormationId) {
                message.warning(t('profile.admin.formations.selectWarning'))
                return
              }
              setCreateModal(true)
            }}
          >
            {t('profile.admin.formations.edit')}
          </Button>
        </Col> */}
      </Row>

      <Table
        dataSource={formations?.data}
        columns={columns}
        rowSelection={rowSelectionObj}
        rowKey="id"
      />
      {createModal && 
        <CreateFormation
          open={createModal}
          onCancel={() => {
            setCreateModal(false)
            refetch()
            setSelectedFormationId(undefined)
            setSelectedRowKeys([])
          }}
          selectedFormationId={selectedFormationId}
        />
      }
    </>
  )
}
 