import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { AUTHENTICATED_COOKIE_KEY } from 'src/App'
import Api from 'src/helpers/api'
import { sessionActions, currentUserActions, loaderActions } from 'src/store/actions'
import HeaderComponent from 'src/components/organisms/Header'
import ROUTES from 'src/constants/routes'

const Header = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser.item)
  const [_cookies, _setCookie, removeCookie] = useCookies()
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      dispatch(sessionActions.deleteRequest())
      dispatch(loaderActions.changeStatus({ status: true }))
      await Api.Session.destroy()
      dispatch(sessionActions.deleteSuccess())
      navigate(ROUTES.root)
      dispatch(currentUserActions.logout())
      dispatch(loaderActions.changeStatus({ status: false }))
      removeCookie(AUTHENTICATED_COOKIE_KEY)
    } catch (error) {
      dispatch(sessionActions.deleteFailed())
      dispatch(loaderActions.changeStatus({ status: false }))
    }

  }

  return <HeaderComponent currentUser={currentUser} handleLogout={onLogout} />
}

export default Header
