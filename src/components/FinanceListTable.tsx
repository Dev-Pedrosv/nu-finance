import { FinanceList } from '@/types/finance-list'
import { currencyFormat } from '@/app/lib/currencyFormat'
import { Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface Props {
  financeList?: FinanceList[]
  onDelete: (value: string) => void
}

export function FinanceListTable({ financeList, onDelete }: Props) {
  if (!financeList) return null

  return (
    <div className="mt-14 flex w-full flex-col items-center gap-3">
      <div className="grid w-[820px] grid-cols-4 gap-4">
        <p className="ml-5 text-start text-sm text-gray-500">Titulo</p>
        <p className="text-start text-sm text-gray-500 ">Valor</p>
        <p className="text-start text-sm text-gray-500 ">Categoria</p>
        <p className="ml-5 text-start text-sm text-gray-500">Data</p>
      </div>

      {financeList?.length > 0 ? (
        financeList?.map((finance) => {
          const textColorClassName = twMerge(
            'text-start font-medium',
            finance.type === 'withdraw' ? `text-red-500` : 'text-green-500',
          )

          return (
            <div
              key={finance.id}
              className="grid h-10 w-[820px] grid-cols-4 items-center gap-4 rounded-lg bg-white shadow-xl"
            >
              <p className="ml-5 text-start font-medium">{finance.title}</p>
              <p className={textColorClassName}>
                {currencyFormat(finance.amount)}
              </p>
              <p className="text-start font-medium">{finance.category}</p>
              <div className="mx-5 flex items-center justify-between text-start font-medium">
                {new Date(finance.date).toLocaleDateString()}
                <button
                  className="text-red-500 transition-all hover:text-red-400"
                  onClick={() => onDelete(finance.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <div className="mt-5 text-lg font-bold">
          Adicione uma nova transação
        </div>
      )}
    </div>
  )
}
