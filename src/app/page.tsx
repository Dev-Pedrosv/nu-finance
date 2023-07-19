import NuBankLogo from '@/assets/logo.svg'
import GoogleLogo from '@/assets/google-icon.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-8 bg-[#E5E5E5]">
      <div className="relative h-[80px] w-[150px]">
        <Image src={NuBankLogo} alt="nubank logo" fill />
      </div>
      <button className="flex gap-2 rounded-2xl bg-purple-600 px-6 py-2 font-semibold text-white">
        <div className="relative h-6 w-6 ">
          <Image src={GoogleLogo} alt="google logo" fill />
        </div>
        Login com Google
      </button>
    </main>
  )
}
