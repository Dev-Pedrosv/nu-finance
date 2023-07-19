'use client'

import { currencyFormat } from '@/app/lib/currencyFormat'
import { EyeOffIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
  totalBalance: number
}

export function ProfileInfo(props: Props) {
  const [showSalary, setShowSalary] = useState(false)

  console.log(props.totalBalance)

  const handleShowSalary = () => setShowSalary(!showSalary)

  return (
    <div className="h-32 w-full bg-purple-600 px-12 py-6">
      <p className="text-sm text-white">Olá, Pedro Henrique da Silva</p>
      <div className="flex w-52 items-center justify-between text-white">
        <p>Total</p>
        <button
          className="mt-3 transition-opacity hover:opacity-70"
          onClick={handleShowSalary}
        >
          {showSalary ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      <p className="text-lg font-bold text-white">
        {showSalary ? 'R$ *******' : currencyFormat(props.totalBalance)}
      </p>
    </div>
  )
}
