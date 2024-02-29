'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  isOpen: boolean
  onCloseStart?(): void
  onCloseEnd?(): void
  static?: boolean
}

export function Modal({
  isOpen,
  onCloseStart,
  onCloseEnd,
  static: staticProp,
  children,
}: Props) {
  return (
    <Transition
      appear
      data-debug="Dialog"
      show={isOpen}
      as={Dialog}
      onClose={() => {
        onCloseStart?.()
        onCloseEnd != null && setTimeout(onCloseEnd, 250)
      }}
      static={staticProp}
    >
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            entered="opacity-100"
          >
            <div className="fixed inset-0 transform-gpu bg-gray-500/50 transition-opacity" />
          </Transition.Child>
          <div className="m-auto w-full max-w-md">
            <Transition.Child
              enter="ease-out transform duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in transform duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Dialog.Panel className="inline-block w-full transform overflow-hidden rounded bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  )
}
