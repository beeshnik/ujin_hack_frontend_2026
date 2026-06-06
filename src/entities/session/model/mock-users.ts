import type { SessionUser, UserRole } from './types'
import { ROLE_PERMISSIONS } from './permissions'

export interface MockUser extends SessionUser {
  password: string
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Алексей Смирнов',
    email: 'admin@example.com',
    role: 'admin',
    password: 'demo',
  },
  {
    id: '2',
    name: 'Мария Петрова',
    email: 'manager@example.com',
    role: 'manager',
    password: 'demo',
  },
  {
    id: '3',
    name: 'Иван Козлов',
    email: 'user@example.com',
    role: 'user',
    password: 'demo',
  },
  {
    id: '4',
    name: 'Гость',
    email: 'guest@example.com',
    role: 'guest',
    password: 'demo',
  },
]

export const QUICK_LOGIN_ROLES: { role: UserRole; label: string }[] = [
  { role: 'admin', label: 'Войти как администратор' },
  { role: 'manager', label: 'Войти как менеджер' },
  { role: 'user', label: 'Войти как пользователь' },
]

export function findMockUser(email: string, password: string): MockUser | undefined {
  return MOCK_USERS.find((u) => u.email === email && u.password === password)
}

export function getMockUserByRole(role: UserRole): MockUser {
  const user = MOCK_USERS.find((u) => u.role === role)
  if (!user) throw new Error(`Mock user with role ${role} not found`)
  return user
}

export function createSession(user: MockUser) {
  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken: `mock-token-${user.role}-${Date.now()}`,
    permissions: ROLE_PERMISSIONS[user.role],
  }
}
