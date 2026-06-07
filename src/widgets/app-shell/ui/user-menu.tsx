import { LogOut, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Badge } from '@/shared/ui/badge'
import { useSessionStore } from '@/entities/session/model/session-store'
import { useLogout } from '@/features/auth/logout'
import { ROUTES } from '@/shared/config/route-paths'
import { useGetMe } from '@/shared/api/generated/users/users'

const ROLE_LABELS: Record<string, string> = {
  admin: 'Администратор',
  manager: 'Менеджер',
  user: 'Пользователь',
  guest: 'Гость',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function UserMenu() {
  const session = useSessionStore((s) => s.session)
  const { logout } = useLogout()
  const navigate = useNavigate()

  // const {data: me} = useGetMe()

  // const user = me ? me. : {
  //   name: "Пользователь",
  //   role: "USER",
  //   id: "someId"

  // }

  if (!session) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-md p-1 hover:bg-accent">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {getInitials(session.user ? session.user.name : "Пользователь")}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:block">
            {session.user ? session.user.name : "Пользователь"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">
              {session.user ? session.user.name : "Пользователь"}
            </span>
            <Badge variant="secondary" className="w-fit text-xs">
              {session.user
                ? ROLE_LABELS[session.user.role] || session.user.role
                : "Пользователь"}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
