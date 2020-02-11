import React from 'react'
import PropTypes from 'prop-types'

import StyledHeaderAppTitle from './styled'

const HeaderAppTitle = props => <StyledHeaderAppTitle {...props}>{props.children}</StyledHeaderAppTitle>

HeaderAppTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
}

export default HeaderAppTitle
