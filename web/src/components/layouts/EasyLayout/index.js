import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Box,
  AppBar,
  Toolbar,
} from '@mui/material'
import { useTheme } from '@emotion/react'

import { THEME_MODES } from 'src/theme'
import { mainBackgroundLightImg, mainBackgroundDarkImg } from 'src/assets/img'

import Header from 'src/components/organisms/Header'
import Loader from 'src/components/organisms/Loader'
import { MainTitle } from 'src/components/atoms'

const HEADER_HEIGHT = '100px'

const EasyLayout = props => {
  const { title, children } = props
  const theme = useTheme()

  const backgroundImg = theme.palette.mode === THEME_MODES.dark
                          ? mainBackgroundDarkImg
                          : mainBackgroundLightImg

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

      <Box component='main'>
        <Loader />
        <Container maxWidth='lg' sx={{ py: theme.spacing(2) }}>
          {title && <MainTitle title={title} />}
          {children}
        </Container>
      </Box>
    </Box>
  )
}

EasyLayout.propTypes = {
  children: PropTypes.any.isRequired,
  // title: PropTypes.string.isRequired | PropTypes.string,
  title: PropTypes.string,
}

export default EasyLayout
