import { createBrowserRouter, Navigate } from "react-router-dom"
import { ROUTES } from "@/shared/config/route-paths"
import { RequireAuth } from "./guards/require-auth"
import { RequirePermission } from "./guards/require-permission"
import { AppShell } from "@/widgets/app-shell/ui/app-shell"
import { lazy, Suspense } from "react"
import Dashboard from "@/pages/dashboard/ui/Dashboard"
import { Complexes } from "@/pages/complexes"
import { Groups } from "@/pages/groups"
import { Displays } from "@/pages/displays"
import { Alerts } from "@/pages/alerts"
import { Templates } from "@/pages/templates"
import { Houses } from "@/pages/houses"
import { RegistrationPage } from "@/pages/auth/registration"
import { DeviceScreenPage } from "@/pages/device-screen"
import { CreateTemplate } from "@/pages/create-template"
import { DisplayInfoPage } from "@/pages/displayInfo"

const LoginPage = lazy(() => import("@/pages/auth/login"))
const DashboardPage = <Dashboard />
const ComplexesPage = <Complexes />
const GroupsPage = <Groups />
const DisplaysPage = <Displays />
const AlertsPage = <Alerts />
const TemplatesPage = <Templates />
const HousesPage = <Houses />

const AccessDeniedPage = lazy(() => import("@/pages/access-denied"))
const NotFoundPage = lazy(() => import("@/pages/not-found"))

const PageLoader = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
)

function S(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: S(LoginPage),
  },
  { path: ROUTES.REGISTRATION, element: <RegistrationPage /> },
  {
    path: "/",
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.ACCESS_DENIED,
    element: S(AccessDeniedPage),
  },
  {
    path: ROUTES.DEVICE_SCREEN,
    element: <DeviceScreenPage />,
  },
  {
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.COMPLEXES,
        element: <Complexes />,
      },
      {
        path: ROUTES.GROUPS,
        element: <Groups />,
      },
      {
        path: ROUTES.DISPLAYS,
        element: <Displays />,
      },
      {
        path: ROUTES.ALERTS,
        element: <Alerts />,
      },
      {
        path: ROUTES.TEMPLATES,
        element: <Templates />,
      },
      {
        path: ROUTES.HOUSES,
        element: <Houses />,
      },
      {
        path: ROUTES.CREATE_TEMPLATE,
        element: <CreateTemplate />,
      },
      {
        path: ROUTES.DISPLAY_PAGE,
        element: <DisplayInfoPage />,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: S(NotFoundPage),
  },
])
