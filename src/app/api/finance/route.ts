import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: Request) {
  const userSession = await getServerSession(authOptions)

  const listWords = await prisma.financeTransaction.findMany({
    where: { userId: (userSession?.user as any)?.id },
  })

  return new NextResponse(JSON.stringify(listWords), { status: 200 })
}

export async function POST(request: Request) {
  const req = await request.json()
  const userSession = await getServerSession(authOptions)

  const { title, amount, category, type } = req

  const newFinance = await prisma.financeTransaction.create({
    data: {
      userId: (userSession?.user as any)?.id,
      amount,
      title,
      category,
      type,
    },
  })

  if (!newFinance) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'ERROR_TO_CREATE_NEW_WORD',
        },
      }),
    )
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      newFinance,
    }),
    { status: 201 },
  )
}
