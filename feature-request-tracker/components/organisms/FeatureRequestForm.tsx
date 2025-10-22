'use client';

import React, { useState } from 'react';
import { useCreateFeatureRequestMutation } from '../../services/featureRequestApi';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useRouter } from 'next/navigation';

const FeatureRequestForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [createFeatureRequest, { isLoading, isSuccess, isError, error }] = useCreateFeatureRequestMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !requestedBy) {
      // Simple validation
      return;
    }
    await createFeatureRequest({ title, description, requestedBy, priority });
  };

  if (isSuccess) {
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <Input label="Requested By" value={requestedBy} onChange={(e) => setRequestedBy(e.target.value)} required />
      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
      {isError && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}
    </form>
  );
};

export default FeatureRequestForm;