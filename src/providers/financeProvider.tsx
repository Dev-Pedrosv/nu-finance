'use client'

import { FinanceList } from '@/types/finance-list'
import axios from 'axios'
import { createContext, useState, ReactNode, useEffect } from 'react'

interface CreateFinanceProps extends Omit<FinanceList, 'id' | 'createdAt'> {}

interface FinanceContextType {
  financeList: FinanceList[]
  setFinanceList: (value: FinanceList[]) => void
  getFinance: () => void
  createFinance: (value: CreateFinanceProps) => void
  deleteFinance: (value: string) => void
  isLoading: boolean
}

export const FinanceContext = createContext({} as FinanceContextType)

interface ContextProps {
  children: ReactNode
}

export function FinanceProvider({ children }: ContextProps) {
  const [financeList, setFinanceList] = useState<FinanceList[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getFinance()
  }, [])

  const getFinance = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/api/finance')
      setFinanceList(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const createFinance = async (data: CreateFinanceProps) => {
    try {
      const newFinance: FinanceList = await axios.post('/api/finance', {
        body: data,
      })

      setFinanceList([...financeList, newFinance])
    } catch (err) {
      console.log(err)
    }
  }

  const deleteFinance = async (financeId: string) => {
    try {
      await axios.post('/api/finance', {
        body: financeId,
      })

      const updateList = financeList.filter(
        (finance) => finance.id !== financeId,
      )

      setFinanceList(updateList)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FinanceContext.Provider
      value={{
        financeList,
        setFinanceList,
        getFinance,
        createFinance,
        deleteFinance,
        isLoading,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}
