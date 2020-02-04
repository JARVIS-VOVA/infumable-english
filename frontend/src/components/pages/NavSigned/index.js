import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BaseLink } from 'react-router5'

import { NavItem } from '../../atoms'

const NavSigned = ({ router }) => (
  <>
    <div className='left'>
      <BaseLink
          router={router}
          routeName='home'
          routeOptions={{ reload: true }}
      >
        <NavItem>Home</NavItem>
      </BaseLink>
      <BaseLink router={router} routeName='word'>
        <NavItem>Word</NavItem>
      </BaseLink>
    </div>
    <div className='right'>
      <BaseLink router={router} routeName='logout'>
        <NavItem>Logout</NavItem>
      </BaseLink>
    </div>
  </>
)

NavSigned.propTypes = {
  router: PropTypes.object.isRequired
}

export default NavSigned
