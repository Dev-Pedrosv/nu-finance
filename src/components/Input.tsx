import { ComponentPropsWithoutRef, LegacyRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean
  errorMessage?: string
}

function Input(
  { className, error, errorMessage, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined,
) {
  const inputClassName = twMerge(
    'mt-5 h-10 w-full rounded-xl bg-[#F7F7FF] pl-4 shadow-lg outline-none',
    error ? 'border-red-500' : 'focus:ring-1 focus:ring-primary',
    className,
  )

  return (
    <div className="flex w-full flex-col">
      <input ref={ref} className={inputClassName} {...props} />
      {error && errorMessage && (
        <span className="mt-1 text-xs text-red-400">{errorMessage}</span>
      )}
    </div>
  )
}

export default forwardRef(Input)
