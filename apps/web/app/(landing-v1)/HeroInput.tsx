'use client'

import cx from 'clsx'

import { useButton, Spinner, ButtonProps } from '@nextui-org/react'

interface InputProps {
  placeholder: string
  ctaLabel: string
}

function HeroInputButton({
  children,
  ...rest
}: React.PropsWithChildren<ButtonProps>) {
  const {
    domRef,
    children: btnChildren,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    isLoading,
    getButtonProps,
    styles,
  } = useButton({
    children,
    ...rest,
  })

  return (
    <button
      ref={domRef}
      className={cx(
        'flex cursor-pointer select-none items-center rounded-r-2xl bg-white px-6 hover:bg-gray-200',
        styles
      )}
      {...getButtonProps()}
    >
      {isLoading && spinnerPlacement === 'start' && spinner}
      <span className="font-sans text-base text-black">{btnChildren}</span>
      {isLoading && spinnerPlacement === 'end' && spinner}
    </button>
  )
}

export function HeroInput({ ctaLabel, placeholder }: InputProps) {
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
      <HeroInputButton>{ctaLabel}</HeroInputButton>
    </div>
  )
}
