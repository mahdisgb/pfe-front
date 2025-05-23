import { DeleteOutlined } from '@ant-design/icons';
import { useCreate, useDelete, useGetIdentity, useList, useTranslation } from '@refinedev/core';
import { Button, Col, message, Modal, Row, Switch, Table, TableColumnType, Tooltip, Upload } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { CreateCourse } from './Components/CreateCourse';
const { Dragger } = Upload;

export const ProfessorCoursesPage = () => {
  const {translate: t} = useTranslation();
  const [activePage, setActivePage] = useState('content');
  const [activeTab, setActiveTab] = useState('videos');
  const [createModal, setCreateModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const {data: user} = useGetIdentity<any>();
  const {mutate: uploadVideo} = useCreate();
  const {mutate: deleteCourse} = useDelete();
  const {mutate: toggleCourse} = useCreate();
  const {data: courses, refetch} = useList({
    resource: "courses/professor/",
    pagination: {
      mode: "client"
    },
    filters: [{
      field: "professorId",
      operator: "eq",
      value: user?.id
    }],
    meta: {
      enabled: !!user?.id
    }
  })

  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: any) => {
    setSelectedCourseId(selectedRowKeys[0] as number)
    setSelectedRowKeys(selectedRowKeys)
  }

  const rowSelectionObj: TableRowSelection<any> = {
    type: "radio",
    onChange: onSelectChange,
    selectedRowKeys: selectedRowKeys
  }

  const columns: TableColumnType<any>[] = [
    {
      title: t('profile.professor.courses.table.index'),
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: t('profile.professor.courses.table.thumbnail'),
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
      title: t('profile.professor.courses.table.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('profile.professor.courses.table.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('profile.professor.courses.table.category'),
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: t('profile.professor.courses.table.lessonsCount'),
      dataIndex: 'lessonCount',
      key: 'lessonCount',
    },
    {
      title: t('profile.professor.courses.table.actions'),
      key: 'actions',
      render: (text, record) => (
        <>
          <Tooltip title={t('profile.professor.courses.actions.delete')}>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined/>}
              onClick={() => handleDelete(record.id)}
              size='large'
            />
          </Tooltip>
          <Tooltip title={t('profile.professor.courses.actions.toggleActive')}>
            <Switch
              size='small'
              checkedChildren={t('profile.professor.courses.actions.on')}
              unCheckedChildren={t('profile.professor.courses.actions.off')}
              checked={record.isActive}
              onChange={(checked) => handleToggleActive(record.id, checked)}
            />
          </Tooltip>
        </>
      )
    }
  ];

  const handleToggleActive = (id: number, isActive: boolean) => {
    toggleCourse({
      resource: "courses/toggle",
      values: {id, isActive}
    }, {
      onSuccess: () => {
        message.success(t('profile.professor.courses.messages.toggleSuccess'))
        refetch()
      },
      onError: () => {
        message.error(t('profile.professor.courses.messages.toggleError'))
      }
    })
  }

  const handleDelete = (id: number) => {
    Modal.confirm({
      centered: true,
      title: t('profile.professor.courses.actions.delete'),
      type: "error",
      content: t("modal.deleteCourse"),
      onOk: () => {
        deleteCourse({
          resource: "courses",
          id,
          values: {
            id
          }
        }, {
          onSuccess: () => {
            message.success(t('profile.professor.courses.messages.deleteSuccess'))
            refetch()
          },
          onError: () => {
            message.error(t('profile.professor.courses.messages.deleteError'))
          }
        })
      }
    })
  }

  return (
    <>
      <Row style={{marginBottom: "20px"}} justify={"end"} gutter={16}>
        <Col>
          <Button
            onClick={() => setCreateModal(true)}
            type='primary'
          >
            {t('forms.course.create')}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              if(!selectedCourseId) {
                message.warning(t("modal.selectCourse"))
                return
              }
              setCreateModal(true)
            }}
          >
            {t('forms.course.edit')}
          </Button>
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
          onCancel={() => {
            setCreateModal(false)
            refetch()
            setSelectedCourseId(undefined)
            setSelectedRowKeys([])
          }}
          selectedCourseId={selectedCourseId}
        />
      }
    </>
  )
}
 