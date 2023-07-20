import { currencyFormat } from '@/lib/currencyFormat'

interface Props {
  deposit?: number
  withdraw?: number
}

export function Balance(props: Props) {
  const deposit = props.deposit ?? 0
  const withdraw = props.withdraw ?? 0

  const sum = deposit - withdraw
  const totalPercentage = ((deposit / sum) * 100).toFixed(0)
  const percentageWithdraw = (Number(totalPercentage) - 100) * -1

  return (
    <div className="mx-auto mt-2 flex h-24 w-full max-w-[360px] flex-col justify-between rounded-xl bg-white p-3 shadow-md md:-mt-5 md:max-w-[458px] ">
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
      <div className="flex h-2 w-full overflow-hidden rounded-xl">
        <span
          style={{ width: `${totalPercentage}%` }}
          className="block h-2 bg-green-500 "
        ></span>
        <span
          style={{ width: `${percentageWithdraw}%` }}
          className="block h-2 bg-red-500"
        ></span>
      </div>
    </div>
  )
}
