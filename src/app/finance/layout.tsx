import { ReactNode } from 'react'
import { FinanceProvider } from '@/providers/financeProvider'

export default function RootLayout({ children }: { children: ReactNode }) {
  return <FinanceProvider>{children}</FinanceProvider>
}
