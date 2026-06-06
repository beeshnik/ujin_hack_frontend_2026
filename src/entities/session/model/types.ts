export type UserRole = 'admin' | 'user' 

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
  role: UserRole
}

export interface Session {
  user: SessionUser
  accessToken: string,
  refreshToken: string,
  permissions: Permission[]
}
