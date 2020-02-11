import styled, { css } from 'styled-components'

import { HORIZONTAL_PADDING } from 'Constants/size'

const HeaderRight = styled.div`
  display: flex;
  padding-right: ${HORIZONTAL_PADDING}px;

  @media screen and (max-width: 600px) {
    display: none;

    ${({ isToggle }) => isToggle &&
      css`
        display: flex;
        flex-direction: column;
        text-align: left;
      `
    }
  }
`

export default HeaderRight
