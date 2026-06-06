import { NavLink } from 'react-router-dom'
import { cn } from '@/shared/lib/cn'
import { useSessionStore } from '@/entities/session/model/session-store'
import { NAV_ITEMS } from '../config/nav-items'

interface AppSidebarProps {
  onNavigate?: () => void
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  // const hasPermission = useSessionStore((s) => s.hasPermission)

  // const visibleItems = NAV_ITEMS.filter(
  //   (item) => !item.permission || hasPermission(item.permission),
  // )

  const visibleItems = NAV_ITEMS

  return (
    <nav className="flex flex-col gap-1 p-2">
      {visibleItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )
          }
        >
          <item.icon className="h-4 w-4 shrink-0" />
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}
