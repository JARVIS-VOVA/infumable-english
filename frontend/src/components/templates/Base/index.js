import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Header, Main, Title, Content, Footer } from './styled'

      // {header}
const PageTemplate = ({ header, footer, children, title }) => {
  return (
    <Wrapper>
      <Header>{header}</Header>
      <Main>
        <Title>{title}</Title>
        <Content>{children}</Content>
      </Main>
      <Footer>{footer}</Footer>
    </Wrapper>
  )
}

PageTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
}

export default PageTemplate
