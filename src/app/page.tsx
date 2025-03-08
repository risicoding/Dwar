import EntryForm from '@/components/entryForm';
import React from 'react';

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <EntryForm column='DID' />
    </div>
  );
};

export default Page;
