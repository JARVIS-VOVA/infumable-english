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

import { mainBackgroundLightImg, mainBackgroundDarkImg } from 'src/assets/img'
import Header from 'src/containers/Header'
import Loader from 'src/containers/Loader'
import { THEME_MODES } from 'src/theme'

const HEADER_HEIGHT = '100px'

const EasyLayouts = props => {
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
          <Typography variant='h4'>
            {title}
          </Typography>
          <Box sx={{ pt: theme.spacing(2) }}>
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

EasyLayouts.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
}

export default EasyLayouts
