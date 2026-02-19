import React from 'react'
import { BaseLayout } from '../../shared/components/BaseLayout'
import SignUpForm from './SignUpForm'

const SignUpPage: React.FC = () => {
  return (
    <BaseLayout title="Sign Up">
      <SignUpForm />
    </BaseLayout>
  )
}

export default SignUpPage
