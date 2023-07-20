import { ReactNode } from 'react'
import './globals.css'
import { Montserrat } from 'next/font/google'
import { NextAuthProvider } from '@/providers/auth'
import ToastProvider from '@/providers/toast'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Nu Finance',
  description: 'Finance control',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NextAuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
