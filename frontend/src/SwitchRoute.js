import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

import Home from 'Components/pages/Home'
import SignIn from 'Pages/SignIn'
import SignUp from 'Pages/SignUp'
// import Loader from 'Containers/Loader'
// import Messages from './Messages'
import NotFound from 'Components/pages/NotFound'
// import Logout from 'Containers/Logout'
// import { resourceGetRequest } from 'Store/session/actions'

import ROUTES from 'Constants/routes'
import { currentUserActions } from 'Store/actions'
import PrivateRouter from 'Src/lib/privateRoute'
import PublicRouter from 'Src/lib/publicRoute'
import GlobalStyle from './styled'

const Logout = () => (<div>logout</div>)
const Word = () => (<div>Word</div>)

const App = ({ getCurrentUser, currentUser, error, anythingWasRejected }) => {
  useEffect(() => {
    getCurrentUser()
      .then(res => console.log('SwitchRoute ++', res))
      .catch(qweerror => console.log('SwitchRoute --', anythingWasRejected))
      // console.log('error', error)
  }, [])

  // <Loader />

  return (
    <>
      <GlobalStyle />
      <Switch>
        <PrivateRouter path={ROUTES.WORDS} component={NotFound} />
        <PrivateRouter path={ROUTES.LOGOUT} component={Logout} />

        <PublicRouter path={ROUTES.SIGN_IN} component={SignIn} />
        <PublicRouter path={ROUTES.SIGN_UP} component={SignUp} />

        <Route exact path='/' component={Home} />
        <Route path={ROUTES.HOME} component={Home} />

        <Route path={ROUTES.NOT_FOUND} component={NotFound} />
        <Redirect to={ROUTES.NOT_FOUND} />
      </Switch>
    </>
  )
}

const mapStateToProps = state => ({
  currentUser: state.currentUser.item,
  error: rejected(state, 'CURRENT_USER/GET_REQUEST'),
  anythingWasRejected: rejected(state),
})

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(currentUserActions.getRequest()),
})

App.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(App)
