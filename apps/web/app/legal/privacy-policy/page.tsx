import { Metadata } from 'next'
import policy, { metadata as policyMetadata } from 'terms/privacy-policy.md'

import { LegalMarkdown } from '../LegalMarkdown'

export const metadata: Metadata = {
  title: `ApexAimer ${policyMetadata.title}`,
}

export default function PrivacyPolicy() {
  return <LegalMarkdown title={policyMetadata.title}>{policy}</LegalMarkdown>
}
