import { FinanceList } from '@/types/finance-list'
import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'

const data: FinanceList[] = [
  {
    id: '1',
    title: 'Cartão de crédito',
    amount: 252.64,
    category: 'Casa',
    date: new Date().toString(),
    type: 'withdraw',
  },
  {
    id: '2',
    title: 'Conta de luz',
    amount: 190.12,
    category: 'Casa',
    date: new Date().toString(),
    type: 'withdraw',
  },

  {
    id: '3',
    title: 'Salário',
    amount: 3500,
    category: 'Dev',
    date: new Date().toString(),
    type: 'deposit',
  },

  {
    id: '4',
    title: 'Freelance',
    amount: 1000,
    category: 'Dev',
    date: new Date().toString(),
    type: 'deposit',
  },
]

export async function GET() {
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const requestData = await request.json()
  const { title, amount, category, type } = requestData.body

  data.push({
    id: randomUUID(),
    date: new Date().toString(),
    title,
    amount,
    category,
    type,
  })

  return NextResponse.json('Success')
}
