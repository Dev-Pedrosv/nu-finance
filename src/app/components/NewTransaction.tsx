import Image from 'next/image'
import CardSVG from '../../assets/card.svg'
import IncomeSVG from '../../assets/income.svg'
import OutcomeSVG from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react'
import axios from 'axios'

interface Props {
  isOpen: boolean
  handleCloseNewTransaction: () => void
  onSuccess: () => void
}

export function NewTransaction(props: Props) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  function isActive(value: string) {
    return type === value
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await axios.post('api/finance', {
      body: {
        title,
        amount,
        category,
        type,
      },
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    props.onSuccess()
    props.handleCloseNewTransaction()
  }

  return props.isOpen ? (
    <div className="fixed top-0 flex h-screen w-full items-center justify-center bg-slate-50 bg-opacity-50">
      <form
        onSubmit={handleCreateNewTransaction}
        className="h-[500px] w-[420px] rounded-2xl bg-white px-6 py-5 shadow-lg"
      >
        <div className="flex items-center gap-2 font-semibold">
          <Image src={CardSVG} alt="card" />
          <p>Cadastrar Transação</p>
        </div>

        <input
          placeholder="Titulo"
          className="mt-5 h-10 w-full rounded-xl bg-[#F7F7FF] pl-4 shadow-lg outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          placeholder="Valor"
          className="mt-5 h-10 w-full rounded-xl bg-[#F7F7FF] pl-4 shadow-lg outline-none"
          onChange={(e) => setAmount(Number(e.target.value))}
          type="number"
          min={0}
          value={amount}
        />

        <div className="mt-6 flex items-center justify-around ">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              className={`flex h-20 w-20 items-center justify-center rounded-full  transition-colors hover:opacity-80
              ${isActive('deposit') ? 'bg-green-300' : 'bg-[#E8E8F0]'}
              `}
              onClick={() => setType('deposit')}
            >
              <Image src={IncomeSVG} alt="Entrada" />
            </button>
            <p className="text-gray-600">Entrada</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              className={`flex h-20 w-20 items-center justify-center rounded-full transition-colors hover:opacity-80
              ${isActive('withdraw') ? 'bg-red-300' : 'bg-[#E8E8F0]'}
              `}
              onClick={() => setType('withdraw')}
            >
              <Image src={OutcomeSVG} alt="Saída" />
            </button>
            <p className="text-gray-600">Saída</p>
          </div>
        </div>
        <input
          placeholder="Categoria"
          className="mt-5 h-10 w-full rounded-xl bg-[#F7F7FF] pl-4 shadow-lg outline-none"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />

        <button className="mx-auto mt-5 block h-10 w-[244px] rounded-3xl bg-purple-600 font-semibold text-white transition-colors hover:bg-purple-800">
          Nova transação
        </button>
        <button
          type="button"
          className="mx-auto mt-3 block h-10 w-[244px] rounded-3xl bg-[#F7F7FF] font-semibold shadow-lg transition-colors hover:bg-slate-100"
          onClick={props.handleCloseNewTransaction}
        >
          Cancelar
        </button>
      </form>
    </div>
  ) : null
}
