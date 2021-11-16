import React, { FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

// import { useActions } from 'Hooks/useActions'
// import { useTypedSelector } from 'Hooks/useTypedSelector'
import { Routes } from 'Routes/index'

const App: FC = () => {
  // const {getSession} = useActions()
  // const { user } = useTypedSelector(state => state.user)

  // useEffect(() => {
  //   getSession()
  // }, [])

  // useEffect(() => {
  //   getSession()
  // }, [user])
  
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

export default App
