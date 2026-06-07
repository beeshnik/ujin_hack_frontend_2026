export const ROUTES = {
  LOGIN: "/login",
  REGISTRATION: "/register",
  DASHBOARD: "/dashboard",
  COMPLEXES: "/complexes",
  GROUPS: "/groups",
  DISPLAYS: "/complexes/:complexId/houses/:houseId/displays",
  ALERTS: "/alerts",
  TEMPLATES: "/templates",
  HOUSES: "/complexes/:complexId/houses",
  ACCESS_DENIED: "/access-denied",
  CREATE_TEMPLATE: "/create-template/:templateName",
  DISPLAY_PAGE: "/complexes/:complexId/houses/:houseId/display/:displayId",
  NOT_FOUND: "*",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
