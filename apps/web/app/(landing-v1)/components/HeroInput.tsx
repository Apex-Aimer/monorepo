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
  error?: string
  onFocus?(): void
  onTextChange?(value: string): void
}

function HeroInputButton({ children, isLoading, onPress }: ButtonProps) {
  return (
    <button
      className={cx(
        'bg-bg-primary-inverted flex cursor-pointer select-none items-center rounded-r-2xl px-6',
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
        <span className="font-sans text-lg text-black">{children}</span>
      )}
    </button>
  )
}

export function HeroInput({
  ctaLabel,
  placeholder,
  error,
  onFocus,
  onTextChange,
  ...btnProps
}: InputProps) {
  return (
    <div>
      <div className="flex h-[3.75rem] flex-row">
        <div
          className={cx(
            'bg-bg-primary flex flex-1 items-center rounded-l-2xl  border px-4',
            !!error ? 'border-red-500 border-r-white' : 'border-white'
          )}
        >
          <input
            placeholder={placeholder}
            className={cx(
              'text-text-primary w-full appearance-none bg-transparent font-sans text-lg outline-none',
              'placeholder:text-text-primary placeholder:opacity-50',
              !!error && 'placeholder:text-red-500 placeholder:opacity-100'
            )}
            onFocus={onFocus}
            onChange={(evt) => {
              onTextChange?.(evt.target.value)
            }}
          />
        </div>
        <HeroInputButton {...btnProps}>{ctaLabel}</HeroInputButton>
      </div>
      <p
        className={cx(
          'ml-2 mt-2 line-clamp-1 max-w-xs text-xs text-red-500',
          !error && 'opacity-0'
        )}
      >
        {error || 'no error'}
      </p>
    </div>
  )
}
