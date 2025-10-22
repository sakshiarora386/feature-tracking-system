import React from 'react';
import FeatureRequestForm from '../../../../components/organisms/FeatureRequestForm';

const CreateFeatureRequestPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Feature Request</h1>
      <FeatureRequestForm />
    </div>
  );
};

export default CreateFeatureRequestPage;