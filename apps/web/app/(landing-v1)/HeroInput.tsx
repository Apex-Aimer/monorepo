'use client'

import cx from 'clsx'

import { ThreeDots } from 'react-loader-spinner'

interface ButtonProps {
  children: string
  onPress?(): void
  isLoading?: boolean
}

interface InputProps extends Omit<ButtonProps, 'children'> {
  placeholder: string
  ctaLabel: string
}

function HeroInputButton({ children, isLoading, onPress }: ButtonProps) {
  return (
    <button
      className={cx(
        'flex cursor-pointer select-none items-center rounded-r-2xl bg-white px-6',
        'hover:bg-gray-200'
      )}
      onClick={onPress}
    >
      {isLoading ? (
        <ThreeDots
          width={42}
          height={20}
          color="#000"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : (
        <span className="font-sans text-base text-black">{children}</span>
      )}
    </button>
  )
}

export function HeroInput({ ctaLabel, placeholder, ...btnProps }: InputProps) {
  return (
    <div className="flex h-[3.75rem] flex-row">
      <div className="flex flex-1 items-center rounded-l-2xl border border-white bg-black px-4">
        <input
          placeholder={placeholder}
          className={cx(
            'appearance-none bg-transparent font-sans text-base text-white outline-none',
            'placeholder:text-white placeholder:opacity-50'
          )}
        />
      </div>
      <HeroInputButton {...btnProps}>{ctaLabel}</HeroInputButton>
    </div>
  )
}
