'use client';

import React, { useState } from 'react';
import { useGetFeatureRequestsQuery, GetFeatureRequestsApiArg } from '../../services/featureRequestApi';
import FeatureRequestCard from '../moleles/FeatureRequestCard';
import Select from '../atoms/Select';
import Button from '../atoms/Button';

const FeatureRequestList: React.FC = () => {
  const [sortBy, setSortBy] = useState<GetFeatureRequestsApiArg['sortBy']>('createdAt');
  const [sortOrder, setSortOrder] = useState<GetFeatureRequestsApiArg['sortOrder']>('desc');
  const [status, setStatus] = useState<GetFeatureRequestsApiArg['status']>();
  const [priority, setPriority] = useState<GetFeatureRequestsApiArg['priority']>();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, error, isLoading } = useGetFeatureRequestsQuery({
    sortBy,
    sortOrder,
    status,
    priority,
    page,
    limit,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading feature requests.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Select label="Sort By" value={sortBy} onChange={(e) => setSortBy(e.target.value as GetFeatureRequestsApiArg['sortBy'])}>
            <option value="title">Title</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Created At</option>
          </Select>
          <Select label="Order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as GetFeatureRequestsApiArg['sortOrder'])}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </Select>
          <Select label="Status" value={status || ''} onChange={(e) => setStatus(e.target.value as GetFeatureRequestsApiArg['status'] || undefined)}>
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="InProgress">In Progress</option>
            <option value="UnderReview">Under Review</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </Select>
          <Select label="Priority" value={priority || ''} onChange={(e) => setPriority(e.target.value as GetFeatureRequestsApiArg['priority'] || undefined)}>
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {data?.data?.map((request) => (
          <FeatureRequestCard
            key={request.id}
            id={request.id!}
            title={request.title}
            status={request.status!}
            priority={request.priority!}
            createdAt={request.createdAt!}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {data?.pagination?.currentPage} of {data?.pagination?.totalPages}</span>
        <Button onClick={() => setPage(page + 1)} disabled={page === data?.pagination?.totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default FeatureRequestList;