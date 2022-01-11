import styled from 'styled-components'

import { CURIOUS_BLUE } from 'Constants/colors'

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: inherit;

  a {
    color: ${CURIOUS_BLUE};
  }
`

export const WrapperImgStyled = styled.div`
  img {
    height: 30px;
  }
`

export default StyledFooter
