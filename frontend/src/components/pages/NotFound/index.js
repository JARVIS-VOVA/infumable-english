import React from 'react'

import BaseTemplate from 'Templates/Base'
import Header from 'Containers/Header'
import NotFound from 'Organisms/NotFound'
import Footer from 'Organisms/Footer'

const NotFoundPage = () => (
  <BaseTemplate
    footer={<Footer />}
    header={<Header />}
    title='404'
  >
    <NotFound />
  </BaseTemplate>
)

export default NotFoundPage
