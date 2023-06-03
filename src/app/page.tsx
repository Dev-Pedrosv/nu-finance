'use client'
import NuBankLogo from '../assets/logo.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FinanceList } from '@/types/finance-list'
import { ProfileInfo } from './components/ProfileInfo'
import { Balance } from './components/Balance'
import { FinanceListTable } from './components/FinanceListTable'
import { NewTransaction } from './components/NewTransaction'

export default function Home() {
  const [financeList, setFinanceList] = useState<FinanceList[] | []>([])
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

  return (
    <main className="h-screen bg-[#E5E5E5]">
      <header className="flex justify-between px-12 py-5">
        <Image src={NuBankLogo} alt="NuBank logo" />

        <button
          className="h-10 w-60 rounded-2xl bg-purple-600 text-white transition-colors hover:bg-purple-700"
          onClick={handleOpenNewTransaction}
        >
          Nova transação
        </button>
      </header>

      <div className="h-32 w-full bg-purple-600 px-12 py-6">
        <ProfileInfo />
      </div>

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
