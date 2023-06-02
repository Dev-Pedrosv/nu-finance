export interface FinanceList {
  id: string
  title: string
  value: number
  category: string
  date: string
  type: 'paid' | 'received'
}
