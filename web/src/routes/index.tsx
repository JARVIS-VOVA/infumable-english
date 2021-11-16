import React, { FC, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { useActions } from 'Hooks/useActions'
import { useTypedSelector } from 'Hooks/useTypedSelector'
import HomePageContainer from 'Pages/HomePageContainer/HomePageContainer'

export const Routes: FC = () => {
  const {getSession} = useActions()
  const { user, loading } = useTypedSelector(state => state.user)

  useEffect(() => {
    getSession()
  }, [])

  useEffect(() => {
    getSession()
  }, [user])

  if (loading) {
    return (
      <>
        Loading ...
      </>
    )
  }

  return (
    <Switch>
      <Route exact path='/' component={HomePageContainer} />
    </Switch>
  )
}
