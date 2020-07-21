import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import isEmpty from 'lodash.isempty'

import ROUTES, { OUT_SIDE_ROUTES } from 'Constants/routes'
import { gitHubSvg } from 'Img'

import { Header, HeaderAppTitle } from 'Atoms'
import HeaderSigned from 'Organisms/HeaderSigned'
import HeaderGuest from 'Organisms/HeaderGuest'

import WrapperImgStyled from './styled'

const HeaderComponent = ({ router, currentUser, setToggle, isToggle }) => {
  return (
    <Header isToggle={isToggle} setToggle={() => setToggle(!isToggle)}>
      <HeaderAppTitle>
        <Link to={ROUTES.ROOT}>Infumable English</Link>
      </HeaderAppTitle>
      {isEmpty(currentUser)
        ? <HeaderGuest router={router} isToggle={isToggle} />
        : <HeaderSigned router={router} isToggle={isToggle} />
      }
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
