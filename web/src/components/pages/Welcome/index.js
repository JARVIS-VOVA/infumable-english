import React from 'react'

import BaseLayout from 'src/components/layouts/BaseLayout'
import Welcome from 'src/components/organisms/Welcome'

const WelcomePage = () => (
  <BaseLayout title='Welcome!'>
    <Welcome />
  </BaseLayout>
)

export default WelcomePage
