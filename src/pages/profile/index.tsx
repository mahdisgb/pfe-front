import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from '@refinedev/core';
import { StudentProfile } from './student';
import { ProfessorCoursesPage } from './professor/ProfessorCoursesPage';
import { ProfessorDashboard } from './professor/ProfessorDashboard';
import { AdminDashboardPage } from './admin/AdminDashboardPage';

export const ProfilePage = () => {
  const { id } = useParams();
  const { translate: t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("refine_user")!);
  
  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Compare the requested profile ID with the logged-in user's ID
  if (id && id !== user.id.toString()) {
    // For now, we're not allowing users to view other profiles
    // This could be enhanced with proper permissions later
    return <Navigate to={`/profile/${user.id}`} />;
  }

  // Route based on user role
  if (user.roles.includes('student')) {
    return <StudentProfile />;
  } else if (user.roles.includes('professor')) {
    return <ProfessorDashboard />;
  } else if(user.roles.includes('admin')){
    return <AdminDashboardPage />
  }
    // Handle unknown roles
    // return (
    //   <div className="p-4">
    //     <h2>{t('profile.unknownRole.title')}: {user.roles}</h2>
    //     <p>{t('profile.unknownRole.message')}</p>
    //   </div>
    // );
};
