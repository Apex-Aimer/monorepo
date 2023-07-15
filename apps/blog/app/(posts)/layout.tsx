import { Container } from 'app/components/Container'
import { Footer } from 'ui/Footer'
import { Header } from 'ui/Header'

async function sharedMetaData(params) {
  return {
    // metadataBase: new URL(settings.url),
    title: {
      // TODO
      default: 'ApexAimer blog posts',
      template: '%s | ApexAimer',
    },
    // TODO
    description: 'ApexAimer',
    keywords: ['aim exercises', 'apex legends'],
    authors: [{ name: 'Aleksei Savelev' }],
    // TODO
    // canonical: settings?.url,
    // TODO
    // openGraph: {
    //   images: [
    //     {
    //       // TODO
    //       url: '/img/opengraph.jpg',
    //       width: 800,
    //       height: 600,
    //     },
    //   ],
    // },
    // TODO
    twitter: {
      title: 'ApexAimer',
      card: 'summary_large_image',
    },
    // TODO
    robots: {
      index: true,
      follow: true,
    },
  }
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params)
}

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

      <Footer copyright="ApexAimer" container={Container} />
    </>
  )
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
