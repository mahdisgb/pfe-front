import "./css/index.css";
import {
  Authenticated,
  Refine,
} from "@refinedev/core";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { dataProvider } from "./providers/data";
import { accessControlProvider } from "./providers/accesscontrol";
import { authProvider } from "./providers/auth";
import i18nProviderContext from "./providers/i18n";

import { useResources } from "./resources";
import AuthLayout from "./layouts/AuthLayout";

import {
  Login,
  Home,
  Page403,
  Page404,
  CoursesPage,
  CoursePage,
  CoursePlayer
} from "./pages";
import { HomePageLayout } from "./layouts/HomePageLayout";
import { ProfilePage } from "./pages/profile";
import { StudentProfile } from "./pages/profile/student";
import { ProfessorCoursesPage } from "./pages/profile/professor/ProfessorCoursesPage";
import { ProfessorLessonsPage } from "./pages/profile/professor/ProfessorLessonsPage";
import Enrollment from "./pages/enrollment.tsx";
import { AdminDashboardPage } from "./pages/profile/admin/AdminDashboardPage";
import { AdminSettingsPage } from "./pages/profile/admin/AdminSettingsPage";
import AdminRequestsPage from "./pages/profile/admin/AdminRequestsPage";
import StudentCoursesPage from "./pages/profile/student/StudentCoursesPage";
import "./i18n";

function App() {
  const { i18nProvider } = i18nProviderContext();
  const resources = useResources();
  return (
    <BrowserRouter>
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
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/courseplayer/:id" element={<CoursePlayer />} />
            <Route path="/enrollment/:courseId" element={<Enrollment />} />
            <Route path="*" element={<Page403 />} />
          </Route>

          {/* public routes */}
          <Route
            element={
              <HomePageLayout>
                <Outlet />
              </HomePageLayout>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/courseplayer/:id" element={<CoursePlayer />} />
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
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
}

export default App;
