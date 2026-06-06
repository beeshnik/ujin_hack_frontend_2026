import type { User } from "@/shared/api/generated/model"


export type Permission =
  | 'dashboard:view'
  | 'users:view'
  | 'users:create'
  | 'users:update'
  | 'users:delete'
  | 'projects:view'
  | 'projects:create'
  | 'projects:update'
  | 'projects:delete'
  | 'requests:view'
  | 'requests:create'
  | 'requests:update'
  | 'requests:delete'
  | 'analytics:view'
  | 'settings:view'
  | 'settings:update'
  | 'ui-kit:view'

export interface SessionUser {
  role: User,
  name: string,
  id: string
}

export interface Session {
  user?: User
  accessToken: string,
  refreshToken: string,
  permissions: Permission[]
}
