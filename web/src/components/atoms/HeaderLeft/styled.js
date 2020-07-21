import styled, { css } from 'styled-components'

import { BLACK } from 'Constants/colors'

const HeaderLeft = styled.div`
  display: flex;
  flex-grow: 1;
  margin-left: 50px;

  @media screen and (max-width: 600px) {
    display: none

    ${({ isToggle }) => isToggle &&
      css`
        display: flex;
        flex-direction: column;
        text-align: left;
        margin: 0;
        border-bottom: 1px solid ${BLACK};
      `
    }
  }
`

export default HeaderLeft
