import React from 'react'
import PropTypes from 'prop-types'

import StyledHeaderItem from './styled'

const HeaderItem = ({ children, isToggle }) => <StyledHeaderItem isToggle={isToggle}>{children}</StyledHeaderItem>

HeaderItem.propTypes = {
  children: PropTypes.any.isRequired,
  isToggle: PropTypes.bool.isRequired,
}

export default HeaderItem
