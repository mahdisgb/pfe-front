import { Card, Tabs, List, Avatar, Tag } from 'antd';
import { BookOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';

export const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("refine_user")!);

  return (
    <div className="p-4">
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <Avatar size={64} icon={<UserOutlined />} />
          <div>
            <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-gray-500">Student</p>
          </div>
        </div>

        <Tabs
          items={[
            {
              key: '1',
              label: 'Enrolled Courses',
              children: (
                <List
                  itemLayout="horizontal"
                  dataSource={[]} // TODO: Add enrolled courses data
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<BookOutlined />}
                        title={item.title}
                        description={item.progress + '% completed'}
                      />
                    </List.Item>
                  )}
                />
              ),
            },
            {
              key: '2', 
              label: 'Achievements',
              children: (
                <List
                  itemLayout="horizontal"
                  dataSource={[]} // TODO: Add achievements data
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<TrophyOutlined />}
                        title={item.name}
                        description={item.date}
                      />
                    </List.Item>
                  )}
                />
              ),
            },
            {
              key: '3',
              label: 'History',
              children: (
                <List
                  itemLayout="horizontal"
                  dataSource={[]} // TODO: Add history data
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<BookOutlined />}
                        title={item.courseName}
                        description={`Completed on ${item.completionDate}`}
                      />
                      <div className="text-right">
                        <Tag color={item.grade >= 70 ? 'green' : 'orange'}>
                          Grade: {item.grade}%
                        </Tag>
                      </div>
                    </List.Item>
                  )}
                />
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}; 