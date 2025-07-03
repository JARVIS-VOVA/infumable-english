import React from 'react'
import { Box, Typography } from '@mui/material'

const Welcome = () => (
  <Box>
    <Typography variant='body2'>
      Hello.
    </Typography>

    <Typography variant='body2' sx={{ mt: 1 }}>
      This site will hepl you to learn english
    </Typography>

    <Typography variant='body2' sx={{ mt: 1 }}>
      Remebber, you can't learn english in one day.
    </Typography>

    <Typography variant='body2' sx={{ mt: 1 }}>
      You need to learn it every day.
      And this site will help you with it.
    </Typography>
  </Box>
)

export default Welcome
