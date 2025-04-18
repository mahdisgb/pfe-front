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

import { resources } from "./resources";
import PrivateLayout from "./layouts/PrivateLayout";

import {
  Login,
  Home,
  Page403,
  Page404,
  CoursesPage,
  CoursePage,
  CoursePlayer
} from "./pages";
import HomePageLayout from "./layouts/HomePageLayout";
import { ProfilePage } from "./pages/profile";
import { StudentProfile } from "./pages/profile/student";
import { ProfessorProfile } from "./pages/profile/professor";

function App() {
  const { i18nProvider } = i18nProviderContext();

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
          {/* private */}
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
            <Route path="*" element={<Page403 />} />
          </Route>
          {/* public */}
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
            <Route path="/profile/:id" element={<ProfilePage />} />
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
