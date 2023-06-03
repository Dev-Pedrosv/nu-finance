export interface FinanceList {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'withdraw' | 'deposit'
}
