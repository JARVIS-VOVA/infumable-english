import React, { FC, useState } from 'react'

import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import LoginForm from '../../components/forms/LoginForm'
import RegistrationForm from '../../components/forms/RegistrationForm'

let initialState: 'login' | 'registration'

type initialStateType = typeof initialState

const HomePageContainer: FC = () => {

  const { logoutUser } = useActions()

  const { user, loading, isAuthenticated } = useTypedSelector(state => state.auth)

  const [authType, setAuthType] = useState<initialStateType>('login')
  
  const clickHandler = () => {
    setAuthType(authType === 'login' ? 'registration' : 'login')
  }
  
  if (loading) {
    return (
      <>
        Loading ...
      </>
    )
  }

  return (
    <div>
      { isAuthenticated
        ? <div>
            <button onClick={ () => logoutUser() }>LogOut</button>
            <p>username: { user?.username }</p>
          </div>
        : <div>
            <button
              onClick={ clickHandler }
            >
              { authType === 'login' ? 'Registration' : 'Login' }
            </button>

            <div>
              { authType === 'login'
              ? <LoginForm />
              : <RegistrationForm /> }
            </div>
          </div> }
    </div>
  )
}

export default HomePageContainer
