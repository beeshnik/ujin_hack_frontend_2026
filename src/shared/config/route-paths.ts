export const ROUTES = {
  LOGIN: "/login",
  REGISTRATION: "/register",
  DASHBOARD: "/dashboard",
  COMPLEXES: "/complexes",
  GROUPS: "/groups",
  DISPLAYS: "/displays",
  ALERTS: "/alerts",
  TEMPLATES: "/templates",
  HOUSES: "/complexes/:complexId/houses",
  ACCESS_DENIED: "/access-denied",
  NOT_FOUND: "*",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
