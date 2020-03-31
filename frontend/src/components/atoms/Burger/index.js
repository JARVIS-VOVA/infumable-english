import React from 'react'
import PropTypes from 'prop-types'

import StyledBurger from './styled'

const Burger = ({ isToggle, onClick }) => (
  <StyledBurger isToggle={isToggle} onClick={onClick}>
    <div />
    <div />
    <div />
  </StyledBurger>
)

Burger.propTypes = {
  isToggle: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Burger
