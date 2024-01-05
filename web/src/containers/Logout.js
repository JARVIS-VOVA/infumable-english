import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import router from 'src/config/createRouter'
import { sessionActions } from 'src/store/actions'

const Logout = () => {
  // await this.props.logoutSession()
    // router.navigate('signIn')

  return null
}

const mapStateToProps = state => ({
  isDeleting: state.session.isDeleting
})

const mapDispatchToProps = dispatch => ({
  logoutSession: () => dispatch(sessionActions.deleteRequest())
})

Logout.propTypes = {
  isDeleting: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
