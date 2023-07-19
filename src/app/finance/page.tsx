'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { FinanceList } from '@/types/finance-list'
import { ProfileInfo } from '@/components/ProfileInfo'
import { Balance } from '@/components/Balance'
import { FinanceListTable } from '@/components/FinanceListTable'
import { NewTransaction } from '@/components/NewTransaction'
import Header from '@/components/Header'
import { LogOut } from 'lucide-react'
import ButtonNewTransaction from '@/components/ButtonNewTransaction'

export default function Home() {
  const [financeList, setFinanceList] = useState<FinanceList[] | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  async function fetchData() {
    const { data } = await axios.get('/api/finance')
    setFinanceList(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
          <LogOut />
        </div>
      </Header>
      <ProfileInfo totalBalance={totalBalance || 0} />

      <Balance
        deposit={totalDeposit}
        withdraw={totalWithdraw}
        totalBalance={totalBalance}
      />

      <FinanceListTable
        financeList={financeList}
        onDelete={(value: string) => console.log(value)}
      />
      <NewTransaction
        isOpen={isOpen}
        handleCloseNewTransaction={handleCloseNewTransaction}
        onSuccess={fetchData}
      />
    </main>
  )
}
