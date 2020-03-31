import React from 'react'

import BaseTemplate from 'Templates/Base'
import Header from 'Containers/Header'
import Home from 'Organisms/Home'
import Footer from 'Organisms/Footer'

const HomePage = () => (
  <BaseTemplate
    footer={<Footer />}
    header={<Header />}
    title='WELCOME!'
  >
    <Home />
  </BaseTemplate>
)

export default HomePage
