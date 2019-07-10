import React from 'react'
import { connect } from 'react-redux'
import { routeNodeSelector } from 'redux-router5'

import NotFound from './components/pages/NotFound'

import SignUp from './containers/SignUp'

const SwitchRoute = ({ route }) => {
  const topRouteName = route.name.split('.')[0]

  if (topRouteName === 'signUp') return <SignUp />

  return <NotFound />
}

export default connect(routeNodeSelector(''))(SwitchRoute)
