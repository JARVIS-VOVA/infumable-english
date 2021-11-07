import React from 'react'

import BaseTemplate from 'Templates/Base'
import Header from 'Containers/Header'
import SignUpContainer from 'Containers/SignUp'
import Footer from 'Organisms/Footer'

const SignUpPage = () => (
  <BaseTemplate
    footer={<Footer />}
    header={<Header />}
    title='Sign Up'
  >
    <SignUpContainer />
  </BaseTemplate>
)

export default SignUpPage
