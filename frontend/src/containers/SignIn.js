// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { eventsActions } from '../../store/events';
// import { Events } from './events';
// import { Spinner } from '../../components/Spinner';
// export const EventsContainer = () => {
//   const dispatch = useDispatch();
//   const { loading, events } = useSelector(state => state.events);
//   useEffect(() => {
//     dispatch(eventsActions.fetch({}));
//   }, []);
//   if (loading) return <Spinner className="spinner" />;
//   return (
//     <Events
//       events={ events }
//     />
//   );
// };




import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { pending, rejected, fulfilled, done } from 'redux-saga-thunk'
import { useHistory } from 'react-router-dom'
// import { resourceCreateRequest } from '../store/session/actions'

import SignInComponent from 'Organisms/SignIn'

import { sessionActions } from 'Store/actions'

const SignIn = ({ createSession, error }) => {
  // const handleClick = () => {
  //   let history = useHistory()

  //   history.push("/home")
  // }

  const handleSubmit = data => {
    // const history = useHistory();

    createSession(data)
      // .then(() => handleClick())   // router.navigate('word')
      .then(response => {
        console.log('Success sign in. Response: ', response)
      })
      // .rejected(error => console.log('Error: ', error))
  }

  return <SignInComponent handleSubmit={handleSubmit} />
}

const mapStateToProps = state => ({
  isCreating: state.session.isCreating,
  error: rejected(state, 'CURRENT_USER/GET_REQUEST'),
  anythingWasRejected: rejected(state),
})

const mapDispatchToProps = dispatch => ({
  createSession: data => dispatch(sessionActions.createRequest(data)),
})

SignIn.propTypes = {
  isCreating: PropTypes.bool.isRequired,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SignIn)
