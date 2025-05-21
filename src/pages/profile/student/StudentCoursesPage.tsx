import { useGetIdentity, useList, useTranslation } from '@refinedev/core'
import { Button, Col, Empty, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const StudentCoursesPage = () => {
    const { translate: t } = useTranslation()
    const { data: user } = useGetIdentity<any>()
    const navigate = useNavigate()
    const { data: courses, isLoading, isError } = useList({
        resource: `course-subscriptions/user/${user?.id}`,
        queryOptions: {
            enabled: !!user
        }
    })
    const CourseCard = ({ course }: any) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {course.thumbnail && <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-40 object-cover"
            />} 
            <div className="p-4">
                <Link to={`/course/${course.id}`}>
                    <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                            {/* {course.category.name} */}
                        </span>
                        <div className="flex items-center">
                            <span className="ml-1 text-sm font-medium">{course.rating}</span>
                        </div>
                    </div>
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{course.professor.firstName} {course.professor.lastName}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="mr-3 block">{course.description}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="mr-3 block">{course.lessonCount} {t('course.lessons')}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {t('course.tags')}
                        </span>
                    </div>
                </Link>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${course.price}</span>
                    <Button 
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        {t('course.goToCourse')}
                    </Button>
                </div>
            </div>
        </div>)
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">{t('profile.student.enrolledCourses')}</h1>
            <Row wrap gutter={[16, 16]}> 
                {courses?.data && courses?.data?.length > 0 ? courses?.data?.map((course: any) => (
                    <Col span={8}>
                        <CourseCard course={course.course} />
                    </Col>
                )) : (
                    <Empty 
                    description={t('profile.student.noCourses')} 
                    style={{ backgroundColor: "white", width: "100%", padding: "50px 0" }} 
                    />
                )}
                </Row>
        </div>
    )
}

export default StudentCoursesPage