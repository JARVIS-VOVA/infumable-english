import styled from 'styled-components'
import { TURQUOISE, NEPAL, WHITE } from 'Constants/colors'

const AuthenticationButton = styled.button`
  width: 250px;
  height: 50px;
  border: none;
  border-radius: 10px;
  color: ${WHITE};
  font-weight: 600;
  font-size: 22px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &.valid {
    background-color: ${TURQUOISE};
  }

  &.invalid {
    background-color: ${NEPAL};
  }
`

export default AuthenticationButton
