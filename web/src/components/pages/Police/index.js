import React from 'react'

import BaseTemplate from 'Templates/Base'
import Header from 'Containers/Header'
import Police from 'Organisms/Police'
import Footer from 'Organisms/Footer'

const NotFoundPage = () => (
  <BaseTemplate
    footer={<Footer />}
    header={<Header />}
    title='Police'
  >
    <Police />
  </BaseTemplate>
)

export default NotFoundPage
