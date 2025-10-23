import React from 'react';
import Link from 'next/link';
import Badge from '../atoms/Badge';

interface FeatureRequestCardProps {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
}

const FeatureRequestCard: React.FC<FeatureRequestCardProps> = ({ id, title, status, priority, createdAt }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'blue';
      case 'Open':
        return 'green';
      case 'InProgress':
        return 'yellow';
      case 'UnderReview':
        return 'purple';
      case 'Completed':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'gray';
      case 'Medium':
        return 'blue';
      case 'High':
        return 'yellow';
      case 'Critical':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Link
      href={`/feature-requests/${id}`}
      className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <Badge color={getStatusColor(status)}>{status}</Badge>
      </div>
      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <span className="font-medium">Priority:</span>
          <Badge color={getPriorityColor(priority)}>{priority}</Badge>
        </div>
        <span className="text-gray-300">|</span>
        <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  );
};

export default FeatureRequestCard;