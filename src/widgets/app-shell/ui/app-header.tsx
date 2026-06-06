import { Menu } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet'
import { ThemeToggle } from '@/features/theme/ui/theme-toggle'
import { UserMenu } from './user-menu'
import { AppSidebar } from './app-sidebar'
import { useState } from 'react'

export function AppHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Открыть меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="px-4 py-3 border-b">
              <SheetTitle className="text-left text-sm font-semibold">
                Monitor Play
              </SheetTitle>
            </SheetHeader>
            <AppSidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <span className="hidden text-sm font-semibold md:block">Frontend</span>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
