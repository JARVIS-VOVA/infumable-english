import React from 'react'
import { connect } from 'react-redux'
import { routeNodeSelector } from 'redux-router5'

import NotFound from './components/pages/NotFound'
import Home from './components/pages/Home'
import SignUp from './containers/SignUp'

const SwitchRoute = ({ route }) => {
  const topRouteName = route.name.split('.')[0]

  if (topRouteName === 'signUp') return <SignUp />
  if (topRouteName === 'home') return <Home />

  return <NotFound />
}

export default connect(routeNodeSelector(''))(SwitchRoute)
