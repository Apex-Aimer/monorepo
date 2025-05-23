import { Header, Footer } from 'ui'
import HeroSection from './HeroSection'
import { HeaderContainer } from './HeaderContainer'
import { Metadata } from 'next'
import { Highlights } from './Highlights'
import { FAQ } from './FAQ'
import { DottedBG } from './components/DottedBG'
import { HeroSubInput } from './components/HeroSubscriptionInput'

export const metadata: Metadata = {
  title: 'Warm-ups to reach your peak in Apex Legends',
  description:
    'Get better doing warm-ups every day before playing Apex Legends with our mobile app',
  keywords: [
    'Apex Legends',
    'firing range',
    'warm-up',
    'aim',
    'recoil control',
    'aim tracking',
    'aim precision',
    'Apex Legends movement',
  ],
  creator: 'Aleksei Savelev',
  openGraph: {
    images: [
      {
        url: `https://${process.env.MEDIA_PROD_DOMAIN}/apexaimer-landing-og.jpg`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexAimer',
    description: 'Warm-ups to reach your peak in Apex Legends',
    creator: '@TheApexAimer',
    images: [
      `https://${process.env.MEDIA_PROD_DOMAIN}/apexaimer-landing-og.jpg`,
    ],
  },
}

export default function Page() {
  return (
    <>
      <Header
        left={[
          {
            label: 'Blog',
            href: `http://${process.env.BLOG_DOMAIN}`,
            external: true,
          },
        ]}
        right={[
          {
            label: 'Contact',
            href: 'mailto:aleksei@apexaimer.com',
          },
        ]}
        container={HeaderContainer}
      />
      <HeroSection />
      <Highlights />
      <FAQ />
      <DottedBG className="max-w-screen-md px-7 py-12 md:py-28">
        <HeroSubInput />
      </DottedBG>
      <Footer copyright="ApexAimer" container={HeaderContainer} />
    </>
  )
}
