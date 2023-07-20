import { ReactNode } from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'
import { NextAuthProvider } from '@/providers/auth'
import ToastProvider from '@/providers/toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'Nu Finance',
  description: 'Finance control',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
