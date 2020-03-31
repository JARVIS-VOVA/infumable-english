import React from 'react'

import { Link } from 'Atoms'

import StyledFooter from './styled'

const Footer = () => {
  const { URL_GITHUB_REPOSITORY } = process.env
  const currentYear = new Date().getFullYear()

  return (
    <StyledFooter>
      © 2019 - {currentYear}
      <Link href={URL_GITHUB_REPOSITORY} target="_blank">
        GitHub
      </Link>
    </StyledFooter>
  )
}

export default Footer
