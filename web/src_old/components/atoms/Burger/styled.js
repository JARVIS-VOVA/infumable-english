import styled from 'styled-components'

import { CURIOUS_BLUE, BLACK } from 'Constants/colors'

const StyledBurger = styled.button`
  position: absolute;
  // top: 17px;
  top: 23px;
  right: 10px;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ isToggle }) => isToggle ? BLACK : CURIOUS_BLUE};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ isToggle }) => isToggle ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ isToggle }) => isToggle ? '0' : '1'};
    }

    :nth-child(3) {
      transform: ${({ isToggle }) => isToggle ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
  }
`

export default StyledBurger
