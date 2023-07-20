'use client'

import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

import NuBankLogo from '@/assets/logo.svg'
import GoogleLogo from '@/assets/google-icon.svg'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const { status, data } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'authenticated' && data?.user) {
      router.push('/finance')
    }
  }, [data, router, status, pathname])

  const handleLoginClick = () => {
    signIn('google')
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-8 bg-[#E5E5E5]">
      <div className="relative h-[80px] w-[150px]">
        <Image src={NuBankLogo} alt="nubank logo" fill />
      </div>
      <button
        onClick={handleLoginClick}
        className="flex w-[240px] items-center justify-center gap-2 rounded-2xl bg-purple-600 py-2 font-semibold text-white"
      >
        {status === 'loading' ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <div className="relative h-6 w-6 ">
              <Image src={GoogleLogo} alt="google logo" fill />
            </div>
            Login com Google
          </>
        )}
      </button>
    </main>
  )
}
