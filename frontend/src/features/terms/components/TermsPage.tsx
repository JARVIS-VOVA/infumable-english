import React from 'react'
import { BaseLayout } from '../../shared/components/BaseLayout'
import { TermsList } from './TermsList'

const TermsPage: React.FC = () => {
  return (
    <BaseLayout title="My Dictionary">
      <TermsList />
    </BaseLayout>
  )
}

export default TermsPage
