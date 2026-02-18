import React from 'react';
import { BaseLayout } from '../../shared/components/BaseLayout';
import { TagsList } from './TagsList';

const TagsPage: React.FC = () => {
  return (
    <BaseLayout title="Organization Labels">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Tags & <span className="text-blue-500">Labels</span>
          </h2>
          <p className="text-gray-400 font-medium leading-relaxed max-w-2xl">
            Create custom color-coded labels to categorize your English units.
            Efficient organization leads to better recall and structured learning.
          </p>
        </header>

        <TagsList />
      </div>
    </BaseLayout>
  );
};

export default TagsPage;
