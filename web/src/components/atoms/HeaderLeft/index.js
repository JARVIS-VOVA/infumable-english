import React from 'react'
import PropTypes from 'prop-types'

import StyledHeaderLeft from './styled'

const HeaderLeft = ({ children, isToggle }) => <StyledHeaderLeft isToggle={isToggle}>{children}</StyledHeaderLeft>

HeaderLeft.propTypes = {
  children: PropTypes.object.isRequired,
  isToggle: PropTypes.bool.isRequired,
}

export default HeaderLeft
