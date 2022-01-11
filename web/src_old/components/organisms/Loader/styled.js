import styled from 'styled-components'

import { CURIOUS_BLUE, SEASHELL } from 'Constants/colors'

export default styled.div`
  padding: 5px;
  background-color: ${SEASHELL};

  div {
    position: relative;
    width: 100%;
  }

  i {
    position: absolute;
    width: 5px;
    height: 5px;
    left: 0;
    bottom: 0;
    border-radius: 50%;
    background: ${CURIOUS_BLUE};
    animation: move 3s infinite;
  }

  @keyframes move {
    from {
      left: 0;
    }

    to {
      left: 100%;
    }
  }

  .ease i {
    animation-timing-function: ease;
  }

  i:nth-child(2) { animation-delay: .1s; }
  i:nth-child(3) { animation-delay: .2s; }
  i:nth-child(4) { animation-delay: .3s; }
  i:nth-child(5) { animation-delay: .4s; }
  i:nth-child(6) { animation-delay: .5s; }
  i:nth-child(7) { animation-delay: .6s; }
  i:nth-child(8) { animation-delay: .7s; }
  i:nth-child(9) { animation-delay: .8s; }
  i:nth-child(10){ animation-delay: .9s; }
`
