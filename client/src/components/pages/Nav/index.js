import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BaseLink, withRoute } from 'react-router5'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NavLead, NavItem } from '../../atoms'

import './styles.scss'

class Nav extends Component {
  state = {
    menuClass: ''
  }

  setToggleTopMenuClass = () => {
    const menuClass = this.state.menuClass ? '' : 'toggled'

    this.setState({ menuClass })
  }

  render() {
    const { router } = this.props

    return (
      <nav>
        <div className={`top-menu ${this.state.menuClass}`}>
          <NavLead><h1>Infumable English</h1></NavLead>
          <div className='left'>
            <BaseLink
                router={router}
                routeName='home'
                routeOptions={{ reload: true }}
            >
              <NavItem>Home</NavItem>
            </BaseLink>
          </div>
          <div className='right'>
            <BaseLink router={router} routeName='signUp'>
              <NavItem>Sign Up</NavItem>
            </BaseLink>
            <BaseLink router={router} routeName="signIn">
              <NavItem>Sign In</NavItem>
            </BaseLink>
          </div>
          <FontAwesomeIcon icon={faBars} className='top-menu-icon' onClick={this.setToggleTopMenuClass}/>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  router: state.router
})

Nav.propTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Nav)
