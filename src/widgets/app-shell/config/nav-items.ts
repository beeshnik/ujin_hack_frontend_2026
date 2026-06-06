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
    title: 'Обзор',
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    permission: 'dashboard:view',
  },
  {
    title: 'ЖК',
    href: ROUTES.COMPLEXES,
    icon: Table2,
    permission: 'users:view',
  },
  {
    title: 'Здания',
    href: ROUTES.HOUSES,
    icon: BarChart3,
    permission: 'analytics:view',
  },
  {
    title: 'Группы',
    href: ROUTES.GROUPS,
    icon: FileText,
    permission: 'users:view',
  },
  {
    title: 'Дисплеи',
    href: ROUTES.DISPLAYS,
    icon: PanelRight,
    permission: 'users:view',
  },
  {
    title: 'Шаблоны',
    href: ROUTES.TEMPLATES,
    icon: Palette,
    permission: 'ui-kit:view',
  },
  {
    title: 'Режим ЧС',
    href: ROUTES.ALERTS,
    icon: Settings,
    permission: 'settings:view',
  },
]
