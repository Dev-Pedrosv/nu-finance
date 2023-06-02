import { FinanceList } from '@/types/finance-list'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const data: FinanceList[] = [
    {
      id: '1',
      title: 'Cartão de crédito',
      value: 252.64,
      category: 'Casa',
      date: new Date().toString(),
      type: 'paid',
    },
    {
      id: '2',
      title: 'Conta de luz',
      value: 190.12,
      category: 'Casa',
      date: new Date().toString(),
      type: 'paid',
    },

    {
      id: '3',
      title: 'Salário',
      value: 3500,
      category: 'Dev',
      date: new Date().toString(),
      type: 'received',
    },

    {
      id: '4',
      title: 'Freelance',
      value: 1000,
      category: 'Dev',
      date: new Date().toString(),
      type: 'received',
    },
  ]

  return NextResponse.json(data)
}
