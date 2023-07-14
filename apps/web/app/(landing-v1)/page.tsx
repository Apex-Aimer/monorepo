import Image from 'next/image'
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
          className="appearance-none bg-transparent font-sans text-base text-white outline-none placeholder:text-white placeholder:opacity-50"
        />
      </div>
      <div className="flex items-center rounded-r-2xl bg-white px-6">
        <span className="font-sans text-base">{ctaLabel}</span>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="relative flex overflow-hidden bg-black">
      <div className="absolute inset-0 aspect-video">
        <Image
          src="/landing-cover-v1-desktop.jpg"
          alt="View of firing range in ApexAimer"
          fill
          className="xl:-translate-y-[1%] 2xl:-translate-y-[15%]"
        />
      </div>
      <div className="relative flex-[1_0_0%] bg-black" />
      <div className="relative flex aspect-video max-w-7xl flex-[1_1_100%] overflow-hidden">
        <div className="flex flex-1 flex-row items-stretch">
          <div className="flex flex-1 items-center bg-black">
            <div className="flex flex-col gap-8 pl-10">
              <p className="font-prime block text-lg font-black leading-4 tracking-wider text-white opacity-50 lg:text-xl">
                We’re in closed beta for now
              </p>
              <p className="font-prime block text-lg font-black leading-7 tracking-wider text-white lg:text-xl">
                Enter your email to request early access
              </p>
              <Input ctaLabel="Apply" placeholder="your@email.com" />
            </div>
          </div>
          <div className="flex flex-[2_2_0%] flex-row justify-end bg-gradient-to-r from-black to-transparent pr-5 pt-16">
            <div className="relative w-[60%]">
              <div className="absolute inset-0">
                <PhoneMockupSVG className="aspect-[0.49] w-full" />
              </div>
              <div className="absolute inset-0 flex justify-center pt-20">
                <div className="w-1/2">
                  <h2 className="font-prime text-lg font-black leading-7 tracking-wide text-white lg:text-xl">
                    Missing part to start enjoy every match
                  </h2>
                  <div className="mt-8 lg:mt-12">
                    <span className="font-prime text-3xl font-black leading-10 tracking-wider text-white lg:text-[2.3rem] lg:leading-[3rem]">
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
          </div>
        </div>
      </div>
      <div className="relative flex-[1_0_0%]" />
    </div>
  )
}
