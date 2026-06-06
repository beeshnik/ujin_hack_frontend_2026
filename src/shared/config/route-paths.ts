export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TABLES: '/tables',
  CHARTS: '/charts',
  FORMS: '/forms',
  PANELS: '/panels',
  UI_KIT: '/ui-kit',
  SETTINGS: '/settings',
  ACCESS_DENIED: '/access-denied',
  NOT_FOUND: '*',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
