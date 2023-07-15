import { Header } from 'ui'
import HeroSection from './HeroSection'
import { HeaderContainer } from './HeaderContainer'

export default function Page() {
  return (
    <>
      <Header
        left={[
          {
            label: 'Blog',
            // TODO
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
    </>
  )
}
