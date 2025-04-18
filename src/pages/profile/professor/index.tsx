import { Card, Tabs, List, Avatar, Tag, Button } from 'antd';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
import { useGo } from '@refinedev/core';

export const ProfessorProfile = () => {
  const user = JSON.parse(localStorage.getItem("refine_user")!);
  const go = useGo();

  return (
    <div className="p-4">
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <Avatar size={64} icon={<UserOutlined />} />
          <div>
            <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-gray-500">Professor</p>
            <div className="mt-2">
              <Tag color="blue">Computer Science</Tag>
              <Tag color="green">Mathematics</Tag>
            </div>
          </div>
        </div>

        <Tabs
          items={[
            {
              key: '1',
              label: 'My Courses',
              children: (
                <div>
                  <Button 
                    type="primary" 
                    className="mb-4"
                    onClick={() => go({ to: "/courses/create" })}
                  >
                    Create New Course
                  </Button>
                  <List
                    itemLayout="horizontal"
                    dataSource={[]} // TODO: Add professor's courses data
                    renderItem={(item: any) => (
                      <List.Item
                        actions={[
                          <Button 
                            key="edit" 
                            onClick={() => go({ to: `/courses/edit/${item.id}` })}
                          >
                            Edit
                          </Button>,
                          <Button key="delete" danger>Delete</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<BookOutlined />}
                          title={item.title}
                          description={`${item.studentsCount} students enrolled`}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              ),
            },
            {
              key: '2',
              label: 'Statistics',
              children: (
                <div>
                  <Card.Grid style={{ width: '50%' }}>
                    <h3>Total Students</h3>
                    <p className="text-2xl">0</p>
                  </Card.Grid>
                  <Card.Grid style={{ width: '50%' }}>
                    <h3>Total Courses</h3>
                    <p className="text-2xl">0</p>
                  </Card.Grid>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}; 