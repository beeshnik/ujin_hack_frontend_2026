import { Outlet } from 'react-router-dom'
import { AppHeader } from './app-header'
import { AppSidebar } from './app-sidebar'

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <aside className="hidden w-56 shrink-0 border-r bg-sidebar md:block">
          <AppSidebar />
        </aside>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
