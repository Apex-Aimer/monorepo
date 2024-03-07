import cx from 'clsx'

import { PhoneMockupSVG } from './components/PhoneMockup'
import { HeroSubInput } from './components/HeroSubscriptionInput'
import { HeroTitle } from './components/HeroTitle'
import { CmsImage } from '../components/CmsImage'

function PhoneMockup() {
  return (
    <div className="relative flex w-full max-w-[356px] overflow-hidden md:w-[80%] lg:aspect-auto lg:w-[60%] lg:max-w-none xl:w-[50%]">
      <div className="absolute inset-0">
        <PhoneMockupSVG className="aspect-[0.49] w-full" />
      </div>
      <div className="relative flex flex-1">
        <div className="absolute left-[18px] right-[18px] top-[16px] aspect-[0.449] overflow-hidden rounded-[56px]">
          <CmsImage
            src="landing-phone-mockup.png"
            alt="Example of the app ApexAimer"
            fill
          />
        </div>
      </div>
    </div>
  )
}

function HeroPhoneMockupMobile() {
  return (
    <div
      className={cx(
        'relative flex h-[590px] w-full justify-center px-8 pt-16',
        'lg:hidden'
        // 'relative flex flex-[1_1_0%] flex-row justify-center overflow-hidden px-4 pt-5',
        // 'lg:from-bg-primary lg:justify-end lg:bg-gradient-to-r lg:to-transparent lg:pl-0 lg:pr-5 lg:pt-24'
      )}
    >
      <div
        className={cx(
          'absolute bottom-0 left-1/2 top-0 w-full min-w-[700px] -translate-x-1/2 overflow-hidden'
        )}
      >
        <CmsImage
          src="landing-cover-v1-mobile.jpg"
          alt="View of firing range in ApexAimer"
          fill
          className="scale-150"
        />
        <div className="to-bg-primary absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-transparent from-0% to-85%" />
      </div>
      <PhoneMockup />
      <div className="user to-bg-primary pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-80%" />
    </div>
  )
}

export function HeroPhoneMockupDesktop() {
  return (
    <div
      className={cx(
        'relative hidden flex-[1.3] flex-col-reverse items-stretch justify-center overflow-hidden pt-16',
        'lg:flex lg:aspect-video lg:max-w-7xl lg:flex-row'
      )}
    >
      <div
        className={cx(
          'absolute bottom-0 left-1/2 top-0 w-full min-w-[700px] -translate-x-1/2 overflow-hidden'
        )}
      >
        <CmsImage
          src="landing-cover-v1-desktop.jpg"
          alt="View of firing range in ApexAimer"
          fill
          className="scale-150"
        />
        <div className="to-bg-primary absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-transparent from-0% to-85%" />
        <div className={cx('absolute inset-0', 'bg-phone-h-gradient')} />
      </div>
      <PhoneMockup />
      <div className="user to-bg-primary pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-80%" />
    </div>
  )
}

export function HeroPhoneMockup() {
  return (
    <>
      <HeroPhoneMockupMobile />
      <HeroPhoneMockupDesktop />
    </>
  )
}

export default function HeroSection() {
  return (
    <section>
      <div
        className={cx('bg-bg-primary relative flex flex-row overflow-hidden')}
      >
        <div className="bg-bg-primary relative flex-[1_0_0%] " />
        <div className="flex max-w-screen-xl flex-[1_1_100%] flex-col lg:flex-row">
          <div className="flex flex-1 flex-col gap-16 px-6 pb-10 pt-10 lg:px-10">
            <HeroTitle />
            <div className="hidden max-w-[480px] lg:block">
              <HeroSubInput />
            </div>
          </div>
          <HeroPhoneMockup />
        </div>
        <div className="bg-bg-primary relative flex-[1_0_0%]" />
      </div>
      <div className="bg-bg-primary flex justify-center">
        <div className="max-w-lg px-5 pt-16 lg:hidden">
          <HeroSubInput />
        </div>
      </div>
    </section>
  )
}
