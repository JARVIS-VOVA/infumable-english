import styled from 'styled-components'

import { CURIOUS_BLUE, SEASHELL } from 'Constants/colors'

// import { Wrapper, Header, Main, Title, Content, Footer } from './styled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Header = styled.header`
  flex: 0 0 auto;
  // background-color: ${SEASHELL};
  height: 100px;
`

export const Main = styled.main`
  flex: 1 1 auto;
  position: relative;/* need this to position inner content */
  overflow-y: auto;
  padding-bottom: 65px;
  // overflow: hidden;
  padding: 0 50px 0 50px;
`

export const Title = styled.h1`
  margin: 65px 0 65px 0;
  color: ${CURIOUS_BLUE};
  text-align: center;
`

export const Content = styled.div`
`

export const Footer = styled.footer`
  flex: 0 0 auto;
  background: ${SEASHELL};
  height: 100px;
`
