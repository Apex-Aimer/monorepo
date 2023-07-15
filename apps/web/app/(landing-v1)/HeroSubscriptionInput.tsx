'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { HeroInput } from './HeroInput'

function SubSuccess({ isOpen, onClose }: { isOpen: boolean; onClose(): void }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="font-prime text-xl font-medium leading-6 text-white"
                >
                  We got your request
                </Dialog.Title>
                <div className="mt-4">
                  <p className="font-prime text-base text-gray-300">
                    As of right now, we process all requests manually. We will
                    get back to you as soon as possible.
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="font-prime inline-flex justify-center rounded-md border border-white bg-black px-4 py-2 text-base font-medium text-white hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Got it
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export function HeroSubInput() {
  const [isBusy, setIsBusy] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onApply = async () => {
    setIsBusy(true)

    await new Promise((r) => setTimeout(r, 1000))

    setIsBusy(false)
    setIsModalOpen(true)
  }
  return (
    <>
      <HeroInput
        ctaLabel="Apply"
        placeholder="your@email.com"
        onPress={onApply}
        isLoading={isBusy}
      />
      <SubSuccess
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      />
    </>
  )
}
