export const ROUTES = {
  LOGIN: "/login",
  REGISTRATION: "/register",
  DASHBOARD: "/dashboard",
  COMPLEXES: "complexes",
  GROUPS: "/groups",
  DISPLAYS: "/displays",
  ALERTS: "/alerts",
  TEMPLATES: "/templates",
  HOUSES: "/houses",
  ACCESS_DENIED: "/access-denied",
  NOT_FOUND: "*",
  DEVICE_SCREEN: "/device-screen",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
