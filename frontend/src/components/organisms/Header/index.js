import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import isEmpty from 'lodash.isempty'

import ROUTES from 'Constants/routes'
import { gitHubSvg } from 'Img'

import { HeaderItem, Link as CustomLink } from 'Atoms'
import { Header, HeaderAppTitle } from 'Atoms'
import HeaderSigned from 'Organisms/HeaderSigned'
import HeaderGuest from 'Organisms/HeaderGuest'

import WrapperImgStyled from './styled'

const HeaderComponent = ({ router, currentUser, setToggle, isToggle }) => {
  const { URL_GITHUB_REPOSITORY } = process.env

  return (
    <Header isToggle={isToggle} setToggle={() => setToggle(!isToggle)}>
      <HeaderAppTitle>
        <Link to={ROUTES.ROOT}>Infumable English</Link>
      </HeaderAppTitle>
      {isEmpty(currentUser)
        ? <HeaderGuest router={router} isToggle={isToggle} />
        : <HeaderSigned router={router} isToggle={isToggle} />
      }
      <HeaderItem isToggle={isToggle} >
        <CustomLink href={URL_GITHUB_REPOSITORY}>
          <WrapperImgStyled>
            <img src={gitHubSvg} />
          </WrapperImgStyled>
        </CustomLink>
      </HeaderItem>
    </Header>
  )
}

HeaderComponent.propTypes = {
  router: PropTypes.object.isRequired,
  setToggle: PropTypes.func.isRequired,
  isToggle: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
}

export default HeaderComponent
