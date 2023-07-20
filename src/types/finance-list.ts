export interface FinanceList {
  id: string
  title: string
  amount: number
  category: string
  createdAt: string
  type: 'withdraw' | 'deposit'
}
