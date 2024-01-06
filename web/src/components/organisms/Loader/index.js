import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import { CURIOUS_BLUE } from 'src/constants/colors'

const WrapperBox = styled(Box)({
  padding: '5px',
  background: 'transparent',
  position: 'relative',
  width: '100%',
  '@keyframes move': {
    from: { left: 0 },
    to: { left: '100%' },
  },
})

const StyledSpan = styled('span')({
  position: 'absolute',
  width: '5px',
  height: '5px',
  left: 0,
  bottom: 0,
  borderRadius: '50%',
  background: CURIOUS_BLUE,
  animation: 'move 2.5s infinite',
  animationTimingFunction: 'ease',
})

const Loader = ({ isLoading }) => {
  const renderDots = () => {
    if (!isLoading) return null

    return (
      <>
        <StyledSpan />
        <StyledSpan sx={{ animationDelay: '.1s' }} />
        <StyledSpan sx={{ animationDelay: '.2s' }} />
        <StyledSpan sx={{ animationDelay: '.3s' }} />
        <StyledSpan sx={{ animationDelay: '.4s' }} />
        <StyledSpan sx={{ animationDelay: '.5s' }} />
        <StyledSpan sx={{ animationDelay: '.6s' }} />
        <StyledSpan sx={{ animationDelay: '.7s' }} />
        <StyledSpan sx={{ animationDelay: '.8s' }} />
        <StyledSpan sx={{ animationDelay: '.9s' }} />
      </>
    )
  }

  return (
    <WrapperBox>
      {renderDots()}
    </WrapperBox>
  )
}

export default Loader
