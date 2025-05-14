import { useTranslation } from '@refinedev/core';
import { Progress, Card } from 'antd';

interface CourseProgressProps {
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({
  progress,
  completedLessons,
  totalLessons,
}) => {
  const { translate: t } = useTranslation();

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          {t('course.progress.title')}
        </h3>
        <Progress percent={progress} status="active" />
      </div>
      
      <div className="text-gray-600">
        {t('course.progress.completedLessons', {
          completed: completedLessons,
          total: totalLessons
        })}
      </div>
    </Card>
  );
}; 