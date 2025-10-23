import React from 'react';
import Link from 'next/link';

interface FeatureRequestCardProps {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
}

const FeatureRequestCard: React.FC<FeatureRequestCardProps> = ({ id, title, status, priority, createdAt }) => {
  return (
    <Link href={`/feature-requests/${id}`} className="block p-4 border rounded-md hover:bg-gray-50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>{status}</span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <span>Priority: {priority}</span>
        <span className="mx-2">|</span>
        <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  );
};

export default FeatureRequestCard;