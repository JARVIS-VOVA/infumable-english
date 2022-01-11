import React, { FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Routes } from 'Routes/index'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

export default App
