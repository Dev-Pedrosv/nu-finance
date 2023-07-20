import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const financeId = params.id

  if (!financeId) {
    return {
      status: 400,
      body: {
        message: 'Missing word Id',
      },
    }
  }

  const finance = await prisma.financeTransaction.delete({
    where: { id: financeId },
  })

  return new NextResponse(JSON.stringify(finance), { status: 200 })
}
