import React, { FC, useState } from 'react'

import { useActions } from 'Hooks/useActions'
import { UserLoginType } from 'Types/index'

// TODO: Remove initialValues
const initialState = {
  email: 'test@gmail.com',
  password: 'test123',
}

type initialStateType = typeof initialState

const LoginForm: FC = () => {
  const {sessionCreate} = useActions()
  const [formData, setFormData] = useState<initialStateType>(initialState)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  
  const data: UserLoginType = {
    session: {
      email: formData.email,
      password: formData.password,
    }
  }

  const submitForm = () => sessionCreate(data)
  
  return (
    <div>
      <p>Login</p>

      <input
        type='text'
        name='email'
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type='text'
        name='password'
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={submitForm}>login</button>
    </div>
  )
}

export default LoginForm
