import React from 'react'
import PropTypes from 'prop-types'

import StyledHeaderRight from './styled'

const HeaderRight = ({ children, isToggle }) => <StyledHeaderRight isToggle={isToggle}>{children}</StyledHeaderRight>

HeaderRight.propTypes = {
  children: PropTypes.array.isRequired,
  isToggle: PropTypes.bool.isRequired,
}

export default HeaderRight
