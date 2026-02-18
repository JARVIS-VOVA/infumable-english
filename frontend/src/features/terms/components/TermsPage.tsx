import React from 'react';
import { BaseLayout } from '../../shared/components/BaseLayout';
import { TermsList } from './TermsList';

const TermsPage: React.FC = () => {
  return (
    <BaseLayout title="My Dictionary">
      <div className="space-y-6">
        <p className="text-gray-400">
          Manage your personal dictionary of English terms and phrases.
        </p>
        <TermsList />
      </div>
    </BaseLayout>
  );
};

export default TermsPage;
