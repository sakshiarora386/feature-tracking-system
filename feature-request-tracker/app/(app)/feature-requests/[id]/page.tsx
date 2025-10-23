'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import FeatureRequestDetail from '../../../../components/organisms/FeatureRequestDetail';

const FeatureRequestDetailPage: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <p>Loading...</p>;
  }

  return <FeatureRequestDetail id={id as string} />;
};

export default FeatureRequestDetailPage;