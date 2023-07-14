import Image from 'next/image'
import cx from 'clsx'

import { PhoneMockupSVG } from './PhoneMockup'

interface InputProps {
  placeholder: string
  ctaLabel: string
}

function Input({ ctaLabel, placeholder }: InputProps) {
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
      <div className="flex cursor-pointer items-center rounded-r-2xl bg-white px-6 hover:bg-gray-200">
        <span className="font-sans text-base text-black">{ctaLabel}</span>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <div className="relative flex overflow-hidden bg-black">
      <div className="absolute inset-0 hidden aspect-video md:block">
        <Image
          src="/landing-cover-v1-desktop.jpg"
          alt="View of firing range in ApexAimer"
          fill
          className="xl:-translate-y-[1%] 2xl:-translate-y-[15%]"
        />
      </div>
      <div className="relative flex-[1_0_0%] bg-black" />
      <div
        className={cx(
          'relative flex flex-[1_1_100%] flex-col-reverse items-stretch overflow-hidden',
          'md:aspect-video md:max-w-7xl md:flex-row'
        )}
      >
        <div
          className={cx(
            'flex flex-1 flex-col items-center bg-black pb-16 pt-24',
            'md:flex-row md:pb-0 md:pt-0'
          )}
        >
          <div className="flex max-w-md flex-col gap-6 px-6 md:gap-8 md:pl-10 md:pr-0">
            <p
              className={cx(
                'font-prime block text-base font-bold leading-4 tracking-wider text-white opacity-50',
                'md:text-lg md:font-black lg:text-xl'
              )}
            >
              We’re in closed beta for now
            </p>
            <p
              className={cx(
                'font-prime block text-base font-bold leading-7 tracking-wider text-white',
                'md:text-lg md:font-black lg:text-xl'
              )}
            >
              Enter your email to request early access
            </p>
            <Input ctaLabel="Apply" placeholder="your@email.com" />
          </div>
        </div>
        <div
          className={cx(
            'relative flex flex-[2_2_0%] flex-row justify-center overflow-hidden px-4 pt-5',
            'md:justify-end md:bg-gradient-to-r md:from-black md:to-transparent md:pl-0 md:pr-5 md:pt-16'
          )}
        >
          <div className="absolute left-1/2 top-0 aspect-[1.38] w-full min-w-[700px] -translate-x-1/2 overflow-hidden md:hidden">
            <Image
              src="/landing-cover-v1-mobile.jpg"
              alt="View of firing range in ApexAimer"
              fill
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-transparent to-black" />
          </div>
          <div className="relative w-full max-w-[356px] overflow-hidden md:aspect-auto md:w-[60%] md:max-w-none">
            <div className="absolute inset-0">
              <PhoneMockupSVG className="aspect-[0.49] w-full" />
            </div>
            <div className="relative flex justify-center pb-24 pt-16 md:pb-0 lg:pt-20">
              <div className="w-1/2">
                <h2
                  className={cx(
                    'font-prime text-base font-bold leading-6 tracking-wide text-white',
                    'md:text-sm md:font-extrabold md:!leading-6',
                    'lg:text-xl lg:font-extrabold lg:!leading-9'
                  )}
                >
                  Missing part to start enjoy every match
                </h2>
                <div className="mt-8 md:mt-6 lg:mt-12">
                  <span
                    className={cx(
                      'font-prime text-3xl font-black leading-10 tracking-wider text-white',
                      'md:text-xl md:font-extrabold md:!leading-8',
                      'lg:text-[2.3rem] lg:!leading-[3rem]'
                    )}
                  >
                    <span className="opacity-50">EAT</span>
                    <br />
                    <span className="opacity-50">SLEEP</span>
                    <br />
                    WARM-UP
                    <br />
                    <span className="opacity-50">APEX</span>
                    <br />
                    <span className="opacity-50">REPEAT</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="user pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-80% to-black" />
        </div>
      </div>
      <div className="relative flex-[1_0_0%]" />
    </div>
  )
}
