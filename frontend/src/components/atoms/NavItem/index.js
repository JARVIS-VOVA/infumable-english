import React from 'react'
import PropTypes from 'prop-types'

const NavItem = props => <div>{props.children}</div>

NavItem.propTypes = {
  children: PropTypes.string.isRequired
}

export default NavItem
