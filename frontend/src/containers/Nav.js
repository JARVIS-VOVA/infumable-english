import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NavComponent from '../components/pages/Nav'

class Nav extends Component {
  state = {
    menuClass: ''
  }

  setToggleTopMenuClass = () => {
    const menuClass = this.state.menuClass ? '' : 'toggled'

    this.setState({ menuClass })
  }

  render() {
    const { router, currentUser } = this.props
    const { menuClass } = this.state

    return <NavComponent router={router} currentUser={currentUser} setToggleTopMenuClass={this.setToggleTopMenuClass} menuClass={menuClass} />
  }
}

const mapStateToProps = state => ({
  router: state.router,
  currentUser: state.session.item
})

Nav.propTypes = {
  router: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Nav)
