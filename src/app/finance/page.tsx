'use client'

import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { Loader2, LogOut } from 'lucide-react'

import { FinanceList } from '@/types/finance-list'

import { ProfileInfo } from '@/components/ProfileInfo'
import { Balance } from '@/components/Balance'
import { FinanceListTable } from '@/components/FinanceListTable'
import { NewTransaction } from '@/components/NewTransaction'
import Header from '@/components/Header'
import ButtonNewTransaction from '@/components/ButtonNewTransaction'
import Loading from '@/components/Loading'

export default function Home() {
  const { status, data } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [financeList, setFinanceList] = useState<FinanceList[] | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function fetchData() {
    const { data } = await axios.get('/api/finance')
    setFinanceList(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [data, router, status, pathname])

  function handleOpenNewTransaction() {
    setIsOpen(true)
  }

  function handleCloseNewTransaction() {
    setIsOpen(false)
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
    <main className="h-screen bg-[#E5E5E5]">
      <Header>
        <div className="flex items-center gap-4">
          <ButtonNewTransaction onClick={handleOpenNewTransaction} />
          <button
            onClick={() => signOut()}
            className="relative text-black transition-all hover:opacity-60
            
            "
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <LogOut />
              </>
            )}
          </button>
        </div>
      </Header>
      <ProfileInfo totalBalance={totalBalance || 0} />

      <Balance deposit={totalDeposit} withdraw={totalWithdraw} />

      <FinanceListTable
        financeList={financeList}
        onDelete={(value: string) => console.log(value)}
      />
      <NewTransaction
        isOpen={isOpen}
        handleCloseNewTransaction={handleCloseNewTransaction}
        onSuccess={fetchData}
      />
      <Loading isLoading={isLoading} />
    </main>
  )
}
