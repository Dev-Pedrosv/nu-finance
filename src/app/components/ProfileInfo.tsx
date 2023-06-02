'use client'

import { EyeOffIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'

export function ProfileInfo() {
  const [showSalary, setShowSalary] = useState(false)

  const handleShowSalary = () => setShowSalary(!showSalary)

  return (
    <>
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
        {showSalary ? 'R$ *******' : 'R$ 100.699,30'}
      </p>
    </>
  )
}
