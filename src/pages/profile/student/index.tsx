import { Card, Tabs, List, Avatar, Tag } from 'antd';
import { BookOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from '@refinedev/core';

export const StudentProfile = () => {
  const { translate: t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("refine_user")!);

  return (
    <div className="p-4">
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <Avatar size={64} icon={<UserOutlined />} />
          <div>
            <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-gray-500">{t('profile.student.role')}</p>
          </div>
        </div>

        <Tabs
          items={[
            {
              key: '1',
              label: t('profile.student.tabs.enrolledCourses'),
              children: (
                <List
                  itemLayout="horizontal"
                  dataSource={[]} // TODO: Add enrolled courses data
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<BookOutlined />}
                        title={item.title}
                        description={t('profile.student.courseProgress', { progress: item.progress })}
                      />
                    </List.Item>
                  )}
                />
              ),
            },
            {
              key: '2', 
              label: t('profile.student.tabs.achievements'),
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
              label: t('profile.student.tabs.history'),
              children: (
                <List
                  itemLayout="horizontal"
                  dataSource={[]} // TODO: Add history data
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<BookOutlined />}
                        title={item.courseName}
                        description={t('profile.student.completionDate', { date: item.completionDate })}
                      />
                      <div className="text-right">
                        <Tag color={item.grade >= 70 ? 'green' : 'orange'}>
                          {t('profile.student.grade', { grade: item.grade })}
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