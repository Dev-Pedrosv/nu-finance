import React, { ReactNode } from 'react'
import NuBankLogo from '@/assets/logo.svg'
import Image from 'next/image'

type Props = {
  children: ReactNode
}

export default function Header({ children }: Props) {
  return (
    <header className="flex justify-between px-12 py-5">
      <Image src={NuBankLogo} alt="NuBank logo" />
      {children}
    </header>
  )
}
