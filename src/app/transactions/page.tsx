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
    if (item.type === 'deposit') {
      return sum + item.amount
    }
    if (item.type === 'withdraw') {
      return sum - item.amount
    }
    return sum
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

      <div className="-mt-5">
        <Balance deposit={15} withdraw={10} />
      </div>

      <FinanceListTable financeList={financeList} />
      <NewTransaction
        isOpen={isOpen}
        handleCloseNewTransaction={handleCloseNewTransaction}
        onSuccess={fetchData}
      />
    </main>
  )
}
