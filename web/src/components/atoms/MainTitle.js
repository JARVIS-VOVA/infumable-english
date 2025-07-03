import React from 'react'
import { Typography } from '@mui/material'

const DEFAULT_MAIN_TITLE_MB = 4

const MainTitle = props => (
  <Typography mb={props.mb || DEFAULT_MAIN_TITLE_MB} variant='h4'>
    {props.title}
  </Typography>
)

export default MainTitle
