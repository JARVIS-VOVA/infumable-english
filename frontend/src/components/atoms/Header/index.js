import React from 'react'
import PropTypes from 'prop-types'

import Burger from '../Burger'
import StyledHeader from './styled'

const Header = ({ children, setToggle, isToggle }) => (
  <StyledHeader isToggle={isToggle}>
    {children}
    <Burger isToggle={isToggle} onClick={() => setToggle(!isToggle)} />
  </StyledHeader>
)

Header.propTypes = {
  children: PropTypes.array.isRequired,
  isToggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
}

export default Header
