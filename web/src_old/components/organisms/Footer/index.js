import React from 'react'
import { Link } from 'react-router-dom'

import ROUTES, { OUT_SIDE_ROUTES } from 'Constants/routes'
import { gitHubSvg } from 'Img'

import { Link as CustomLink } from 'Atoms'

import StyledFooter, { WrapperImgStyled } from './styled'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <StyledFooter>
      <p>© 2019 - {currentYear}</p>
      <Link to={ROUTES.POLICE}>Police</Link>
      <CustomLink href={OUT_SIDE_ROUTES.URL_GITHUB_REPOSITORY} target='_blank'>
        <WrapperImgStyled>
          <img src={gitHubSvg} />
        </WrapperImgStyled>
      </CustomLink>
    </StyledFooter>
  )
}

export default Footer
