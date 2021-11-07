import React, { useState } from 'react'

import { useActions } from '../../hooks/useActions'

const initialState = {
  email: 'test@gmail.com',
  username: 'test',
  password: 'test123',
  passwordConfirmation: 'test123'
}

type initialStateType = typeof initialState

const RegistrationForm = () => {

  const { registrationUser } = useActions()
  
  const [formData, setFormData] = useState<initialStateType>(initialState)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  
  return (
    <div>
      Registration

      <input
        type='text'
        name='email'
        value={ formData.email }
        onChange={ handleChange }
      />
      <input
        type='text'
        name='username'
        value={ formData.username }
        onChange={ handleChange }
      />
      <input
        type='text'
        name='password'
        value={ formData.password }
        onChange={ handleChange }
      />
      <input
        type='text'
        name='passwordConfirmation'
        value={ formData.passwordConfirmation }
        onChange={ handleChange }
      />
      <button onClick={ () => registrationUser(formData.email, formData.username, formData.password, formData.passwordConfirmation) }>Registration</button>
    </div>
  )
}

export default RegistrationForm
