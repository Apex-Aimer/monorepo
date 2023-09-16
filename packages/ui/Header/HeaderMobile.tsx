'use client'

import { Children, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'

export function HeaderMobileButton() {
  const [open, setOpen] = useState(false)
  return (
    <div
      id="header-mobile-button"
      className="border-line-disabled flex items-center rounded border px-3 md:hidden"
      onClick={() => {
        setOpen(!open)
      }}
      // @ts-expect-error
      isopen={open.toString()}
    >
      <svg
        className="h-6 w-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {open && (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
          />
        )}
        {!open && (
          <path
            fillRule="evenodd"
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
          />
        )}
      </svg>
    </div>
  )
}

interface Props extends PropsWithChildren {}

export function HeaderMobileSection({ children }: Props) {
  const [open, setOpen] = useState(false)

  const { MutationObserver } = global || {}

  const observer = useRef(
    MutationObserver != null
      ? new MutationObserver((mutationList) => {
          for (const mutation of mutationList) {
            if (mutation.type !== 'attributes') {
              continue
            }

            if (mutation.attributeName !== 'isopen') {
              return
            }

            const mobileButtonNode = document.getElementById(
              'header-mobile-button'
            )

            if (mobileButtonNode == null) {
              return
            }

            switch (mobileButtonNode.attributes.getNamedItem('isopen')?.value) {
              case 'true': {
                setOpen(true)
                break
              }
              case 'false': {
                setOpen(false)
                break
              }
            }
          }
        })
      : null
  )

  useEffect(() => {
    const mobileButtonNode = document.getElementById('header-mobile-button')

    if (mobileButtonNode == null) {
      return
    }

    const { current } = observer

    current?.observe(mobileButtonNode, {
      attributes: true,
      attributeFilter: ['isopen'],
    })

    return () => {
      current?.disconnect()
    }
  }, [])

  return (
    <Transition
      appear
      show={open}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex flex-col pt-6">
        {Children.map(children, (child, index) => {
          const isNotLast = index !== Children.count(children) - 1
          return (
            <>
              {child}
              {isNotLast && (
                <div className="border-line-disabled mx-3 flex flex-1 border-t" />
              )}
            </>
          )
        })}
      </div>
    </Transition>
  )
}
