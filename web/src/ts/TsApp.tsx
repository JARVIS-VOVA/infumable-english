import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Routes } from './routes'

const TsApp: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  )
}

export default TsApp
