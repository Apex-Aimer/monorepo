'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import cx from 'clsx'

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
          <div className="bg-backdrop fixed inset-0" />
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
              <Dialog.Panel className="bg-bg-primary w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="font-prime text-text-primary text-xl font-medium leading-6"
                >
                  We got your request
                </Dialog.Title>
                <div className="mt-4">
                  <p className="font-prime text-line text-base">
                    As of right now, we process all requests manually. We will
                    get back to you as soon as possible.
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="font-prime border-bg-accent bg-bg-primary text-text-primary hover:bg-bg-primary-inverted hover:text-text-primary-inverted inline-flex justify-center rounded-md border px-4 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
  const [error, setError] = useState('')

  const emailRef = useRef('')

  const onApply = async () => {
    setIsBusy(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          address: emailRef.current,
        }),
      })

      if (!res.ok) {
        throw await res.json()
      }

      setIsModalOpen(true)
    } catch (err) {
      setError(err.error)
    }

    setIsBusy(false)
  }

  const onFocus = () => {
    setError('')
  }

  const onTextChange = (val: string) => {
    emailRef.current = val
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p
            className={cx(
              'font-prime text-line block text-center text-[1.5rem] font-normal leading-none',
              'lg:text-left'
            )}
          >
            We’re in closed beta for now
          </p>
          <p
            className={cx(
              'font-prime text-line block text-center text-[1.5rem] font-normal leading-none',
              'lg:text-left'
            )}
          >
            Enter your email to request early access
          </p>
        </div>
        <HeroInput
          ctaLabel="Apply"
          placeholder="your@email.com"
          onPress={onApply}
          isLoading={isBusy}
          error={error}
          onFocus={onFocus}
          onTextChange={onTextChange}
        />
      </div>
      <SubSuccess
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      />
    </>
  )
}
