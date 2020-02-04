import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const NavLead = props => <div className='top-menu-lead'>{props.children}</div>

NavLead.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default NavLead
