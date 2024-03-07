import { ReactNode } from 'react'
import cx from 'clsx'

import { CmsImage } from '../components/CmsImage'

function Highlight({
  title,
  description,
  src,
  alt,
  reverse = false,
}: {
  title: ReactNode
  description: string
  src: string
  alt: string
  reverse?: boolean
}) {
  return (
    <div
      className={cx(
        'flex flex-col-reverse items-center gap-7 md:gap-12',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      )}
    >
      <div className="flex flex-1 flex-col gap-5">
        <h4 className="font-prime text-text-primary text-center text-3xl font-medium md:text-left">
          {title}
        </h4>
        <p className="font-prime text-text-primary text-center text-2xl font-medium md:text-left">
          {description}
        </p>
      </div>
      <div className="relative aspect-square w-[200px] overflow-hidden rounded-2xl">
        <CmsImage src={src} alt={alt} fill />
      </div>
    </div>
  )
}

export function Highlights() {
  return (
    <section
      className={cx(
        'bg-bg-primary flex flex-row overflow-hidden pt-20 md:pt-32'
      )}
    >
      <div className="bg-bg-primary flex-[1_0_0%] " />
      <div className="flex max-w-screen-md flex-[1_1_100%] flex-col gap-12 px-8 md:gap-24 md:px-20">
        <Highlight
          title={
            <>
              Practice <span className="text-[#FFBD70]">less</span>, play{' '}
              <span className="text-[#FFBD70]">more</span>
            </>
          }
          description="Do it just for 10 minutes before the game, raise blood in your muscles and enjoy the result."
          src="landing-highlight-1.jpg"
          alt="Player is enjoing practicing less and playing more"
        />
        <Highlight
          title={
            <>
              Use firing range{' '}
              <span className="text-[#FFBD70]">effectively</span>
            </>
          }
          description="Do precisely what needs to be done to be prepared for the game, no more, no less."
          src="landing-highlight-2.jpg"
          alt="The view of a firing range that you want to use effectively"
          reverse
        />
        <Highlight
          title={
            <>
              <span className="text-[#FFBD70]">Progress</span> every day
            </>
          }
          description="Short warm-up, if done consistently every day, can take your skills to the next level."
          src="landing-highlight-3.jpg"
          alt="Progress every day to become the champion"
        />
      </div>
      <div className="bg-bg-primary flex-[1_0_0%]" />
    </section>
  )
}
