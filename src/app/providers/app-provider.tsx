import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './theme-provider'
import { QueryProvider } from './query-provider'
import { Toaster } from '@/shared/ui/sonner'
import { router } from '@/app/routes/router'


export function AppProvider() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="starter-kit-theme">
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster richColors closeButton />
      </QueryProvider>
    </ThemeProvider>
  )
}
