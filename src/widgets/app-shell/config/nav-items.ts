import {
  LayoutDashboard,
  Table2,
  BarChart3,
  FileText,
  PanelRight,
  Palette,
  Settings,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Permission } from '@/entities/session/model/types'
import { ROUTES } from '@/shared/config/route-paths'

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  permission?: Permission
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Главная',
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    permission: 'dashboard:view',
  },
  {
    title: 'Таблицы',
    href: ROUTES.TABLES,
    icon: Table2,
    permission: 'users:view',
  },
  {
    title: 'Графики',
    href: ROUTES.CHARTS,
    icon: BarChart3,
    permission: 'analytics:view',
  },
  {
    title: 'Формы',
    href: ROUTES.FORMS,
    icon: FileText,
    permission: 'users:view',
  },
  {
    title: 'Панели',
    href: ROUTES.PANELS,
    icon: PanelRight,
    permission: 'users:view',
  },
  {
    title: 'UI Kit',
    href: ROUTES.UI_KIT,
    icon: Palette,
    permission: 'ui-kit:view',
  },
  {
    title: 'Настройки',
    href: ROUTES.SETTINGS,
    icon: Settings,
    permission: 'settings:view',
  },
]
