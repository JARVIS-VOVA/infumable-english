import React from 'react'

import { notFound } from 'Img'

import StyledNotFound from './styled'

const NotFound = () => (
  <StyledNotFound>
    <img src={notFound} />
  </StyledNotFound>
)

export default NotFound
