import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import isEmpty from 'lodash.isempty'

import { NavLead, NavItem } from '../../atoms'
import NavSigned from '../NavSigned'
import NavGuest from '../NavGuest'

import './styles.scss'

const Nav = ({ router, currentUser, setToggleTopMenuClass, menuClass }) => (
  <nav>
    <div className={`top-menu ${menuClass}`}>
      <div className='nav-lead'>
        <NavLead><h1>Infumable English</h1></NavLead>
      </div>
      { isEmpty(currentUser) ? <NavGuest router={router} /> : <NavSigned router={router} /> }
      <FontAwesomeIcon icon={faBars} className='top-menu-icon' onClick={setToggleTopMenuClass}/>
    </div>
  </nav>
)

Nav.propTypes = {
  router: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  setToggleTopMenuClass: PropTypes.func.isRequired,
  menuClass: PropTypes.string.isRequired
}

export default Nav
