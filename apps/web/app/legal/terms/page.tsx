import { Metadata } from 'next'
import terms, { metadata as termsMetadata } from 'terms/terms-of-use.md'

import { LegalMarkdown } from '../LegalMarkdown'

export const metadata: Metadata = {
  title: `ApexAimer ${termsMetadata.title}`,
}

export default function PrivacyPolicy() {
  return <LegalMarkdown title={termsMetadata.title}>{terms}</LegalMarkdown>
}
