import styled from 'styled-components'
import { RED, TURQUOISE } from 'Constants/colors'

const WrapperField = styled.div`
  margin-bottom: 15px;

  &:last-child {
    margin: 0px;
  }

  input {
    border: none;
    color: $TURQUOISE;
    width: 250px;
    height: 20px;
    padding-bottom: 5px;
    padding-left: 5px;

    &::placeholder {
      padding: 5px
    }

    &:focus {
      outline: none;
    }
  }

  .validation-border-error {
    border-bottom: 1px solid ${RED};
  }

  .validation-border-success {
    border-bottom: 1px solid ${TURQUOISE};
  }

  .view-error {
    margin: 5px 0px 0px 5px;
    height: 15px;
  }

  .text-error {
    color: ${RED}
  }
`

export default WrapperField
