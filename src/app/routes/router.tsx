
import { createBrowserRouter } from 'react-router-dom'
// import { ROUTES } from '@/shared/config/route-paths'
// import { RequireAuth } from './guards/require-auth'
// import { RequirePermission } from './guards/require-permission'
// import { AppShell } from '@/widgets/app-shell/ui/app-shell'

// const LoginPage = lazy(() => import('@/pages/auth/login'))
// const DashboardPage = lazy(() => import('@/pages/dashboard'))
// const TablesPage = lazy(() => import('@/pages/tables'))
// const ChartsPage = lazy(() => import('@/pages/charts'))
// const FormsPage = lazy(() => import('@/pages/forms'))
// const PanelsPage = lazy(() => import('@/pages/panels'))
// const UiKitPage = lazy(() => import('@/pages/ui-kit'))
// const SettingsPage = lazy(() => import('@/pages/settings'))
// const AccessDeniedPage = lazy(() => import('@/pages/access-denied'))
// const NotFoundPage = lazy(() => import('@/pages/not-found'))

// const PageLoader = () => (
//   <div className="flex min-h-[200px] items-center justify-center">
//     <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//   </div>
// )

// function S(Component: React.ComponentType) {
//   return (
//     <Suspense fallback={<PageLoader />}>
//       <Component />
//     </Suspense>
//   )
// }

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <div>Sss</div>
    }
  ]
)

// export const router = createBrowserRouter([
//   {
//     path: ROUTES.LOGIN,
//     element: S(LoginPage),
//   },
//   {
//     path: '/',
//     element: <Navigate to={ROUTES.DASHBOARD} replace />,
//   },
//   {
//     path: ROUTES.ACCESS_DENIED,
//     element: S(AccessDeniedPage),
//   },
//   {
//     element: (
//       <RequireAuth>
//         <AppShell />
//       </RequireAuth>
//     ),
//     children: [
//       {
//         path: ROUTES.DASHBOARD,
//         element: (
//           <RequirePermission permission="dashboard:view">{S(DashboardPage)}</RequirePermission>
//         ),
//       },
//       {
//         path: ROUTES.TABLES,
//         element: (
//           <RequirePermission permission="users:view">{S(TablesPage)}</RequirePermission>
//         ),
//       },
//       {
//         path: ROUTES.CHARTS,
//         element: (
//           <RequirePermission permission="analytics:view">{S(ChartsPage)}</RequirePermission>
//         ),
//       },
//       {
//         path: ROUTES.FORMS,
//         element: (
//           <RequirePermission permission="users:view">{S(FormsPage)}</RequirePermission>
//         ),
//       },
//       {
//         path: ROUTES.PANELS,
//         element: (
//           <RequirePermission permission="users:view">{S(PanelsPage)}</RequirePermission>
//         ),
//       },
//       {
//         path: ROUTES.UI_KIT,
//         element: (
//           <RequirePermission permission="ui-kit:view">{S(UiKitPage)}</RequirePermission>
//         ),
//       },
//       {
//         path: ROUTES.SETTINGS,
//         element: (
//           <RequirePermission permission="settings:view">{S(SettingsPage)}</RequirePermission>
//         ),
//       },
//     ],
//   },
//   {
//     path: ROUTES.NOT_FOUND,
//     element: S(NotFoundPage),
//   },
// ])
