import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Container,
  Link as MUILink,
} from '@mui/material'

import ROUTES, { OUTSIDE_ROUTES } from 'src/constants/routes'
import { gitHubSvg } from 'src/assets/img'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Container maxWidth='lg' sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
        <Box sx={{ flex: 1 }}>
          <MUILink component={Link} to={ROUTES.police} color='secondary'>Police</MUILink>
        </Box>

        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Typography>Copyright © 2019 - {currentYear}</Typography>
        </Box>

        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
          <Link to={OUTSIDE_ROUTES.UrlGitHubRepository} target='_blank' aria-label='github'>
            <Box component='img' alt='github' sx={{ width: '30px', height: '30px' }} src={gitHubSvg} />
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Footer
