import { FinanceList } from '@/types/finance-list'
import { currencyFormat } from '@/lib/currencyFormat'
import { Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface Props {
  financeList?: FinanceList[]
  onDelete: (value: string) => void
}

export function FinanceListTable({ financeList, onDelete }: Props) {
  if (!financeList) return null

  return (
    <div className="mt-14 flex w-full grid-flow-row flex-col items-center gap-3 px-4 md:px-10">
      <div className="grid w-full max-w-[820px] grid-cols-4 gap-4">
        <p className="ml-5 text-start text-sm text-gray-500">Titulo</p>
        <p className="text-start text-sm text-gray-500 ">Valor</p>
        <p className="text-start text-sm text-gray-500 ">Categoria</p>
        <p className="ml-5 text-start text-sm text-gray-500">Data</p>
      </div>

      {financeList?.length > 0 ? (
        financeList?.map((finance) => {
          const textColorClassName = twMerge(
            'text-start font-medium text-sm md:text-base',
            finance.type === 'withdraw' ? `text-red-500` : 'text-green-500',
          )

          return (
            <div
              key={finance.id}
              className="grid min-h-[40px] w-full max-w-[820px] grid-flow-row grid-cols-4 items-center gap-4 rounded-lg bg-white p-3 shadow-xl"
            >
              <p className="w-full text-start text-sm font-semibold md:text-base">
                {finance.title}
              </p>
              <p className={textColorClassName}>
                {currencyFormat(finance.amount)}
              </p>
              <p className="text-start text-sm font-medium md:text-base">
                {finance.category}
              </p>
              <div className="flex flex-col items-center justify-between px-5 text-start text-sm font-medium md:flex-row md:text-base">
                {new Date(finance.createdAt).toLocaleDateString()}
                <button
                  className="text-red-500 transition-all hover:text-red-400 "
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
