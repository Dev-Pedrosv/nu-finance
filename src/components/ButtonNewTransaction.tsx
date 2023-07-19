import React from 'react'

type Props = {
  onClick: () => void
}

export default function ButtonNewTransaction({ onClick }: Props) {
  return (
    <button
      className="h-10 w-60 rounded-2xl bg-purple-600 text-white transition-colors hover:bg-purple-700"
      onClick={onClick}
    >
      Nova transação
    </button>
  )
}
