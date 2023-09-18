import { Container } from 'app/components/Container'
import { Footer } from 'ui/Footer'
import { Header } from 'ui/Header'

export default async function Layout({ children }) {
  return (
    <>
      <Header
        left={[
          {
            label: 'Home',
            href: '/',
          },
        ]}
        right={[
          {
            label: 'About',
            href: `http://${process.env.MAIN_WEB_DOMAIN}`,
            external: true,
          },
        ]}
        container={Container}
      />

      <div>{children}</div>

      <Footer copyright="ApexAimer" container={Container} hasBorder />
    </>
  )
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
