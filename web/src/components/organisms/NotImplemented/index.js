import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

import ROUTES from 'src/constants/routes'

const NotImplemented = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant='h4'>
        Doesn't Implemented
      </Typography>
      <Typography>
        The page you’re looking for doesn’t Implemented
      </Typography>
      <Button component={Link} to={ROUTES.root} variant='contained'>
        Back Home
      </Button>
    </Box>
  )
}

export default NotImplemented
