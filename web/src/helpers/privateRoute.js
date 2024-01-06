// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import _ from 'lodash'

// import NotFound from 'components/pages/NotFound'

// const PrivateRoute = ({ component: Component, currentUser, ...props }) => {
//   if (_.isEmpty(currentUser)) return <NotFound />

//   return <Component {...props} />
// }

// const mapStateToProps = state => ({
//   currentUser: state.currentUser.item,
// })

// PrivateRoute.propTypes = ({
//   currentUser: PropTypes.object,
// })

// export default connect(mapStateToProps)(PrivateRoute)
