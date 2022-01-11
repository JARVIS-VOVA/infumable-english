import styled, { css } from 'styled-components'

import { HORIZONTAL_PADDING } from 'Constants/size'

const HeaderItem = styled.div`
  text-align: center;
  min-width: 50px;

  &:not(:last-child) {
    padding-right: 10px;
  }

  @media screen and (max-width: 600px) {
    ${({ isToggle }) => isToggle &&
      css`
        text-align: left;
        padding: 10px 0 10px 0;
        padding-left: ${HORIZONTAL_PADDING}px;
      `
    }
  }
`

export default HeaderItem
