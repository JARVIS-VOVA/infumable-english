import React, { FC, useState } from 'react'

import { useActions } from 'Hooks/useActions'
import { useTypedSelector } from 'Hooks/useTypedSelector'
import LoginForm from 'Organisms/LoginForm'
import RegistrationForm from 'Organisms/RegistrationForm'

let initialState: 'login' | 'registration'

type initialStateType = typeof initialState

const HomePageContainer: FC = () => {
  const {sessionDestroy} = useActions()
  const { user, loading } = useTypedSelector(state => state.session)
  const [authType, setAuthType] = useState<initialStateType>('login')

  const clickHandler = () => {
    setAuthType(authType === 'login' ? 'registration' : 'login')
  }

  const logOut = () => {
    sessionDestroy()
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
      { user
        ? <div>
            <button onClick={logOut}>LogOut</button>
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
