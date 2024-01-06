// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import _ from 'lodash'

// import NotFound from 'components/pages/NotFound'

// const PublicRoute = ({ component: Component, currentUser, ...props }) => {
//   if (_.isEmpty(currentUser)) return <Component {...props} />

//   return <NotFound />
// }

// const mapStateToProps = state => ({
//   currentUser: state.currentUser.item,
// })

// PublicRoute.propTypes = ({
//   currentUser: PropTypes.object,
// })

// export default connect(mapStateToProps)(PublicRoute)
