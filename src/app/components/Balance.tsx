export function Balance() {
  return (
    <div className="mx-auto flex h-24 w-[458px] flex-col justify-between rounded-xl bg-white p-3 shadow-md ">
      <div className="flex justify-between">
        <div className="relative">
          <p className="ml-5 text-lg font-bold">R$ 3.900,00</p>
          <span className="absolute block h-2 w-2 rounded-full bg-green-500" />
          <p className="ml-5 mt-1 text-sm text-gray-500">Entrada</p>
        </div>

        <div className="relative">
          <p className="ml-5 text-lg font-bold">R$ 2.200,70</p>
          <span className="absolute block h-2 w-2 rounded-full bg-red-500" />
          <p className="ml-5 mt-1 text-sm text-gray-500">Saida</p>
        </div>
      </div>
      <div className="relative h-2 w-full rounded-xl bg-red-500 before:absolute before:h-2 before:w-4/5 before:bg-green-500 " />
    </div>
  )
}
