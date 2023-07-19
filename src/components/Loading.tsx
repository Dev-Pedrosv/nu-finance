import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {
  isLoading?: boolean
}

export default function Loading({ isLoading }: Props) {
  if (!isLoading) return null

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-center gap-2 bg-black/50 text-2xl text-white">
      <Loader2 className="h-6 w-6 animate-spin" />
      <p>Carregando...</p>
    </div>
  )
}
