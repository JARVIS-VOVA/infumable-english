import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material'
import { useTheme } from '@emotion/react'

import { mainBackgroundLightImg, mainBackgroundDarkImg } from 'img'
import Footer from 'organisms/Footer'
import Header from 'containers/Header'
import Loader from 'containers/Loader'
import { THEME_MODES } from 'src/theme'

const HEADER_HEIGHT = '100px'
const FOOTER_HEIGHT = '100px'

const PageTemplate = props => {
  const { title, children } = props
  const theme = useTheme()

  const backgroundImg = theme.palette.mode === THEME_MODES.dark
                          ? mainBackgroundDarkImg
                          : mainBackgroundLightImg

  // export const Wrapper = styled.div`
  //   background-image: url(${mainBackgroundImg});
  //   display: grid;
  //   grid-template-rows: 1fr auto;
  //   grid-template-columns: 100%;
  //   min-height: 100vh;
  // `

  return (
    <Box sx={{ height: '100%', minHeight: '100vh', backgroundImage: `url(${backgroundImg})` }}>
      <AppBar
        position='static'
        sx={{
          height: HEADER_HEIGHT,
          justifyContent: 'flex-end',
          boxShadow: 0,
          bgcolor: 'unset',
          backgroundImage: 'unset',
        }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>

      <Box component='main' sx={{ minHeight: `calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT})` }}>
        <Loader />
        <Container maxWidth='lg' sx={{ py: theme.spacing(2) }}>
          <Typography variant='h4'>
            {title}
          </Typography>
          <Box sx={{ pt: theme.spacing(4) }}>
            {children}
          </Box>
        </Container>
      </Box>

      <Box component='footer' sx={{ height: FOOTER_HEIGHT, boxShadow: 4 }}>
        <Footer />
      </Box>
    </Box>
  )
}

PageTemplate.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
}

export default PageTemplate
