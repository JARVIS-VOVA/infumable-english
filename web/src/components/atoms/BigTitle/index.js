import React from 'react'
import PropTypes from 'prop-types'

import TitleH1 from '../TitleH1'

import StyledHeader from './styled'

const Header = ({ children }) => (
  <StyledHeader>
    <TitleH1>
      {children}
    </TitleH1>
  </StyledHeader>
)

Header.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Header
