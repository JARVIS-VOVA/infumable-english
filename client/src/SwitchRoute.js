import React from 'react'
import { connect } from 'react-redux'
import { routeNodeSelector } from 'redux-router5'
import isEmpty from 'lodash.isempty'

import Home from './components/pages/Home'
import Logout from './containers/Logout'
import NotFound from './components/pages/NotFound'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import Word from './containers/Word'
import WordNew from './containers/WordNew'

const SwitchRoute = ({ route, currentUser }) => {
  const topRouteName = route.name.split('.')[0]

  if (isEmpty(currentUser)) {
    if (topRouteName === 'signIn') return <SignIn />
    if (topRouteName === 'signUp') return <SignUp />
  } else {
    if (topRouteName === 'word') return <Word />
    if (topRouteName === 'wordNew') return <WordNew />

    if (topRouteName === 'logout') return <Logout />
  }

  if (topRouteName === 'home') return <Home />

  return <NotFound />
}

const mapStateToProps = state => {
  const routeSelector = routeNodeSelector('')

  return (state) => ({
    ...routeSelector(state),
    currentUser: state.session.item
  })
}

export default connect(mapStateToProps)(SwitchRoute)
