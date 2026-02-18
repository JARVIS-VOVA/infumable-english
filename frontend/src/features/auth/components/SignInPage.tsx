import React from 'react';
import { BaseLayout } from '../../shared/components/BaseLayout';
import SignInForm from './SignInForm';

const SignInPage: React.FC = () => {
  return (
    <BaseLayout title="Sign In">
      <SignInForm />
    </BaseLayout>
  );
};

export default SignInPage;
