import React, { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import HomePageContainer from '../pages/HomePageContainer/HomePageContainer'

export const Routes: FC = () => {
  return (
    <Switch>
      <Route exact path='/' render={ () => <HomePageContainer /> } />
    </Switch>
  )
}
