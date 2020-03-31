import React from 'react'
import PropTypes from 'prop-types'

import StyledLink from './styled'

const Link = props => <StyledLink {...props}>{props.children}</StyledLink>

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
}

export default Link
