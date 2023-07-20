'use client'

import React, { useContext, useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { FinanceContext } from '@/providers/financeProvider'

import { Loader2, LogOut } from 'lucide-react'

import { ProfileInfo } from '@/components/ProfileInfo'
import { Balance } from '@/components/Balance'
import { FinanceListTable } from '@/components/FinanceListTable'
import { NewTransaction } from '@/components/NewTransaction'
import Header from '@/components/Header'
import ButtonNewTransaction from '@/components/ButtonNewTransaction'
import Loading from '@/components/Loading'

export default function Home() {
  const { status, data } = useSession()
  const { financeList, isLoading, deleteFinance } = useContext(FinanceContext)
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoadingLogout, setIsLoadingLogout] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [data, router, status, pathname])

  const handleOpenNewTransaction = () => {
    setIsOpen(true)
  }

  const handleCloseNewTransaction = () => {
    setIsOpen(false)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteFinance(id)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    setIsLoadingLogout(true)
    signOut()
  }

  const totalBalance = financeList?.reduce((sum, item) => {
    return item.type === 'deposit' ? sum + item.amount : sum - item.amount
  }, 0)

  const totalDeposit = financeList?.reduce((sum, item) => {
    return item.type === 'deposit' ? sum + item.amount : sum
  }, 0)

  const totalWithdraw = financeList?.reduce((sum, item) => {
    return item.type === 'withdraw' ? sum - item.amount : sum
  }, 0)

  return (
    <main className="min-h-screen bg-[#E5E5E5] pb-20 ">
      <Header>
        <div className="flex items-center gap-4">
          <ButtonNewTransaction onClick={handleOpenNewTransaction} />
          <button
            onClick={handleLogout}
            className="hover:opacity-6 relative text-black transition-all"
          >
            {isLoadingLogout ? (
              <Loader2 className="animate-spin" />
            ) : (
              <LogOut />
            )}
          </button>
        </div>
      </Header>
      <ProfileInfo totalBalance={totalBalance || 0} />
      <Balance deposit={totalDeposit} withdraw={totalWithdraw} />

      <div className="mt-5 max-h-[520px] w-full overflow-y-scroll md:mt-10">
        <FinanceListTable
          financeList={financeList}
          onDelete={(value: string) => handleDelete(value)}
        />
      </div>
      <NewTransaction
        isOpen={isOpen}
        handleCloseNewTransaction={handleCloseNewTransaction}
      />
      <Loading isLoading={isLoading} />
    </main>
  )
}
