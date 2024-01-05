import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Container,
  Link as MUILink,
} from '@mui/material'

import ROUTES, { OUTSIDE_ROUTES } from 'constants/routes'
import { gitHubSvg } from 'img'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Container maxWidth='lg'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <Typography>Copyright © 2019 - {currentYear}</Typography>
      <MUILink component={Link} to={ROUTES.police} color='secondary'>Police</MUILink>

      <Link to={OUTSIDE_ROUTES.UrlGitHubRepository} target='_blank'>
        <Box component='img' sx={{ width: '30px', height: '30px' }} src={gitHubSvg} />
      </Link>
    </Container>
  )
}

export default Footer
