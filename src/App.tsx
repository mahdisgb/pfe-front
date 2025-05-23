import {
  Authenticated,
  Refine,
} from "@refinedev/core";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./css/index.css";
import { AntdProvider } from './providers/antd';

import { accessControlProvider } from "./providers/accesscontrol";
import { authProvider } from "./providers/auth";
import i18nProviderContext from "./providers/i18n";

import AuthLayout from "./layouts/AuthLayout";
import { useResources } from "./resources";

import "./i18n";
import { HomePageLayout } from "./layouts/HomePageLayout";
import {
  CoursePage,
  CoursePlayer,
  CoursesPage,
  Home,
  Login,
  Page403,
  Page404
} from "./pages";
import Enrollment from "./pages/enrollment.tsx";
import { Formation } from "./pages/formation";
import { FormationEnroll } from "./pages/formationEnroll";
import { ProfilePage } from "./pages/profile";
import AdminCoursesPage from "./pages/profile/admin/AdminCoursesPage";
import { AdminDashboardPage } from "./pages/profile/admin/AdminDashboardPage";
import AdminManageChat from "./pages/profile/admin/AdminManageChat";
import { AdminManageFormations } from "./pages/profile/admin/AdminManageFormations";
import AdminManageUsers from "./pages/profile/admin/AdminManageUsers";
import AdminRequestsPage from "./pages/profile/admin/AdminRequestsPage";
import { AdminSettingsPage } from "./pages/profile/admin/AdminSettingsPage";
import { ProfessorCoursesPage } from "./pages/profile/professor/ProfessorCoursesPage";
import { ProfessorLessonsPage } from "./pages/profile/professor/ProfessorLessonsPage";
import StudentCoursesPage from "./pages/profile/student/StudentCoursesPage";
import { StudentDashboard } from "./pages/profile/student/StudentDashboard";
import { dataProvider } from "./providers/data";
function App() {
  const { i18nProvider } = i18nProviderContext();
  const resources = useResources();
  return (
    <BrowserRouter>
      <AntdProvider>
        <Refine
          dataProvider={dataProvider(import.meta.env.VITE_APP_API_URL)}
          routerProvider={routerBindings}
          authProvider={authProvider}
          accessControlProvider={accessControlProvider}
          resources={resources}
          i18nProvider={i18nProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "",
          }}
        >
          <Routes>
            {/* Profile routes with AuthLayout */}
            <Route
              element={
                <Authenticated
                  key="profile-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <HomePageLayout>
                  <AuthLayout>
                    <Outlet />
                  </AuthLayout>
                  </HomePageLayout>
                </Authenticated>
              }
            >
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/courses" element={<ProfessorCoursesPage />} />
              <Route path="/profile/lessons" element={<ProfessorLessonsPage />} />
              <Route path="/profile/dashboard" element={<AdminDashboardPage />} />
              <Route path="/profile/professor-requests" element={<AdminRequestsPage />} />
              <Route path="/profile/settings" element={<AdminSettingsPage />} />
              <Route path="/profile/my-courses" element={<StudentCoursesPage />} />
              <Route path="/profile/student-dashboard" element={<StudentDashboard />} />
              <Route path="/profile/manage-courses" element={<AdminCoursesPage />} />
              <Route path="/profile/manage-users" element={<AdminManageUsers />} />
              <Route path="/profile/manage-chat" element={<AdminManageChat />} />
              <Route path="/profile/manage-formations" element={<AdminManageFormations />} />
            </Route>

            {/* Other authenticated routes with HomePageLayout */}
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <HomePageLayout>
                    <Outlet />
                  </HomePageLayout>
                </Authenticated>
              }
            >
              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/courses" element={<CoursesPage />} /> */}
              <Route path="/course/:id" element={<CoursePage />} />
              <Route path="/enrollment/:courseId" element={<Enrollment />} />
              <Route path="/formation-enrollment/:formationId" element={<FormationEnroll />} />
              <Route path="/formation" element={<Formation />} /> 
            {/* <Route path="/courseplayer/:id" element={<CoursePlayer />} /> */}


              <Route path="*" element={<Page403 />} />
            </Route>
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                    <Outlet />
                </Authenticated>}>
                <Route path="/courseplayer/:id" element={<CoursePlayer />} />

            </Route>

            {/* public routes */}
            <Route
              element={
                <HomePageLayout>
                  <Outlet />
                </HomePageLayout>
              }
            >
              <Route index element={<Home />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/formation" element={<Formation />} /> 
            {/* <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/courseplayer/:id" element={<CoursePlayer />} />
            <Route path="/formation" element={<Formation />} /> */}
            </Route>

            <Route
              path="/login"
              element={
                <Authenticated key="auth-routes" fallback={<Outlet />}>
                  <NavigateToResource resource="home" />
                </Authenticated>
              }
            >
              <Route index element={<Login />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>

          <UnsavedChangesNotifier />
        </Refine>
      </AntdProvider>
    </BrowserRouter>
  );
}

export default App;
