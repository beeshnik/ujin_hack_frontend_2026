import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Separator } from '@/shared/ui/separator'
import { useSessionStore } from '@/entities/session/model/session-store'
import {
  findMockUser,
  getMockUserByRole,
  createSession,
  QUICK_LOGIN_ROLES,
} from '@/entities/session/model/mock-users'
import type { UserRole } from '@/entities/session/model/types'
import { ROUTES } from '@/shared/config/route-paths'
import { loginSchema, type LoginFormValues } from '../model/schema'

export function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useSessionStore((s) => s.setSession)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const from = (location.state as { from?: Location })?.from?.pathname || ROUTES.DASHBOARD

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null)
    setIsLoading(true)

    await new Promise((r) => setTimeout(r, 600))

    const user = findMockUser(data.email, data.password)
    if (!user) {
      setServerError('Неверный email или пароль')
      setIsLoading(false)
      return
    }

    setSession(createSession(user))
    navigate(from, { replace: true })
  }

  const handleQuickLogin = async (role: UserRole) => {
    setServerError(null)
    setIsLoading(true)

    await new Promise((r) => setTimeout(r, 400))

    const user = getMockUserByRole(role)
    setSession(createSession(user))
    navigate(ROUTES.DASHBOARD, { replace: true })
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Вход в систему</h1>
        <p className="text-sm text-muted-foreground">
          Демо-пароль: <span className="font-mono font-semibold">demo</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            autoComplete="email"
            disabled={isLoading}
            {...register('email')}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isLoading}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Войти
        </Button>
      </form>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          или быстрый вход
        </span>
      </div>

      <div className="space-y-2">
        {QUICK_LOGIN_ROLES.map(({ role, label }) => (
          <Button
            key={role}
            variant="outline"
            className="w-full"
            disabled={isLoading}
            onClick={() => {
              const user = getMockUserByRole(role)
              setValue('email', user.email)
              setValue('password', user.password)
              handleQuickLogin(role)
            }}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
