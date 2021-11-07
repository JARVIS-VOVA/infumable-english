import React, { FC, useState } from 'react'

import { useActions } from '../../hooks/useActions'

const initialState = {
  email: 'test@gmail.com',
  password: 'test123',
}

type initialStateType = typeof initialState

const LoginForm: FC = () => {

  const { loginUser } = useActions()

  const [formData, setFormData] = useState<initialStateType>(initialState)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  
  return (
    <div>
      Login

      <input
        type='text'
        name='email'
        value={ formData.email }
        onChange={ handleChange }
      />
      <input
        type='text'
        name='password'
        value={ formData.password }
        onChange={ handleChange }
      />
      <button onClick={ () => loginUser(formData.email, formData.password) }>login</button>
    </div>
  )
}

export default LoginForm
