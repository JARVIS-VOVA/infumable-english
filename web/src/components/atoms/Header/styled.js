import styled, { css }  from 'styled-components'

import { SEASHELL, CURIOUS_BLUE, WEB_ORANGE, BLACK } from 'Constants/colors'
// import { HORIZONTAL_PADDING } from 'Constants/size'

// width: calc(100% - ${HORIZONTAL_PADDING * 2}px);

const Header = styled.header`
  z-index: 1;
  background-color: ${SEASHELL};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: inherit;

  *:hover {
    cursor: pointer;
  }

  a {
    color: ${CURIOUS_BLUE};

    &.active {
      color: ${WEB_ORANGE};
    }
  }

  @media screen and (max-width: 600px) {
    ${({ isToggle }) => isToggle &&
      css`
        max-height: 1500px;
        display: block;
      `
    }
  }
`

export default Header
