import React from 'react'

import BaseTemplate from 'Templates/Base'
import Header from 'Containers/Header'
import SignInContainer from 'Containers/SignIn'
import Footer from 'Organisms/Footer'

const SignInPage = () => (
  <BaseTemplate
    footer={<Footer />}
    header={<Header />}
    title='Sign In'
  >
    <SignInContainer />
  </BaseTemplate>
)

export default SignInPage
