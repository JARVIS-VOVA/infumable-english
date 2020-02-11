import React from 'react'
import PropTypes from 'prop-types'

import StyledTitleH1 from './styled'

const TitleH1 = ({ children }) => <StyledTitleH1>{children}</StyledTitleH1>

TitleH1.propTypes = {
  children: PropTypes.string.isRequired,
}

export default TitleH1
