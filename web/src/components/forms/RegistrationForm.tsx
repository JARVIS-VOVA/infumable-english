import React, { useState } from 'react'

import { useActions } from 'Hooks/useActions'
import { UserRegistrationType } from 'Types/index'

// TODO: Remove initialValues
const initialState = {
  email: 'test@gmail.com',
  username: 'test',
  password: 'test123',
  passwordConfirmation: 'test123'
}

type initialStateType = typeof initialState

const RegistrationForm = () => {
  const {userCreate} = useActions()
  const [formData, setFormData] = useState<initialStateType>(initialState)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  
  const data: UserRegistrationType = {
    user: {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      passwordConfirmation: formData.passwordConfirmation
    }
  }
  const submitForm = () => userCreate(data)
  
  return (
    <div>
      <p>Registration</p>

      <input
        type='text'
        name='email'
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type='text'
        name='username'
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type='text'
        name='password'
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type='text'
        name='passwordConfirmation'
        value={formData.passwordConfirmation}
        onChange={handleChange}
      />
      <button onClick={submitForm}>Registration</button>
    </div>
  )
}

export default RegistrationForm
