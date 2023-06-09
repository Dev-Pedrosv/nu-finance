import { currencyFormat } from '../lib/currencyFormat'

interface Props {
  deposit?: number
  withdraw?: number
}

export function Balance(props: Props) {
  const deposit = props.deposit ?? 0
  const withdraw = props.withdraw ?? 0

  const summary = deposit - withdraw

  const percentageBalance = `${((summary / deposit) * 100).toFixed(2)}%`

  return (
    <div className="mx-auto flex h-24 w-[458px] flex-col justify-between rounded-xl bg-white p-3 shadow-md ">
      <div className="flex justify-between">
        <div className="relative">
          <p className="ml-5 text-lg font-bold">{currencyFormat(deposit)}</p>
          <span className="absolute block h-2 w-2 rounded-full bg-green-500" />
          <p className="ml-5 mt-1 text-sm text-gray-500">Entrada</p>
        </div>

        <div className="relative">
          <p className="ml-5 text-lg font-bold">{currencyFormat(withdraw)}</p>
          <span className="absolute block h-2 w-2 rounded-full bg-red-500" />
          <p className="ml-5 mt-1 text-sm text-gray-500">Saida</p>
        </div>
      </div>
      <div
        className={`relative h-2 w-full rounded-xl bg-red-500 before:absolute before:h-2 before:w-[${percentageBalance}] before:bg-green-500 `}
      />
    </div>
  )
}
