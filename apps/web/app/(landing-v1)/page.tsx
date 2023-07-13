import Image from 'next/image'
import { PhoneMockupSVG } from './PhoneMockup'

export default function Page() {
  return (
    <div className="relative flex aspect-video flex-1 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/landing-cover-v1-desktop.jpg"
          alt="View of firing range in ApexAimer"
          fill
        />
      </div>
      <div className="absolute inset-0 flex flex-1 flex-row items-stretch">
        <div className="flex-1 bg-black" />
        <div className="flex flex-[2_2_0%] flex-row justify-end bg-gradient-to-r from-black to-transparent pr-5 pt-16">
          <div className="relative w-[60%]">
            <div className="absolute inset-0">
              <PhoneMockupSVG className="aspect-[0.49] w-full" />
            </div>
            <div className="absolute inset-0 flex justify-center pt-20">
              <div className="w-1/2">
                <h2 className="font-prime text-lg font-black leading-7 tracking-wide text-white">
                  Missing part to start enjoy every match
                </h2>
                <div className="mt-8">
                  <span className="font-prime text-3xl font-black leading-10 tracking-wider text-white">
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
  )
}
