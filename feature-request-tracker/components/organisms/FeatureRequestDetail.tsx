"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  featureRequestApiApi,
  GetFeatureRequestsApiArg,
} from "../../services/featureRequestApi";
import Button from "../atoms/Button";
import Select from "../atoms/Select";
import Badge from "../atoms/Badge";

interface FeatureRequestDetailProps {
  id: string;
}

const FeatureRequestDetail: React.FC<FeatureRequestDetailProps> = ({ id }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    data: featureRequestResponse,
    error,
    isLoading,
  } = featureRequestApiApi.useGetFeatureRequestsByIdQuery({ id });
  const [updateStatus, { isLoading: isUpdating }] =
    featureRequestApiApi.usePutFeatureRequestsByIdStatusMutation();
  const [deleteFeatureRequest, { isLoading: isDeleteLoading }] =
    featureRequestApiApi.useDeleteFeatureRequestsByIdMutation();

  const featureRequest = featureRequestResponse?.data;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as GetFeatureRequestsApiArg["status"];
    if (newStatus) {
      updateStatus({ id, body: { status: newStatus } });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    await deleteFeatureRequest({ id });
    router.push("/");
  };

  const cancelDelete = () => {
    setIsDeleting(false);
  };

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

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-xl font-bold text-red-700">Error</h2>
      <p className="text-red-600">Error loading feature request.</p>
    </div>
  );
  
  if (!featureRequest) return (
    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 className="text-xl font-bold text-yellow-700">Not Found</h2>
      <p className="text-yellow-600">Feature request not found.</p>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-gray-900">{featureRequest.title}</h1>
          <Badge color={getStatusColor(featureRequest.status || "")}>{featureRequest.status}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700">{featureRequest.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Request Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Requested By:</span>
                <span className="font-medium">{featureRequest.requestedBy}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Priority:</span>
                <Badge color={getPriorityColor(featureRequest.priority || "")}>
                  {featureRequest.priority}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Timestamps
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">
                  {new Date(featureRequest.createdAt!).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">
                  {new Date(featureRequest.updatedAt!).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
          <div className="w-full sm:w-64">
            <Select
              label="Status"
              value={featureRequest.status || ""}
              onChange={handleStatusChange}
            >
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="InProgress">In Progress</option>
              <option value="UnderReview">Under Review</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </Select>
          </div>
          <Button variant="danger" onClick={handleDelete}>
            Delete Request
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this feature request? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={cancelDelete} disabled={isDeleteLoading}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete} isLoading={isDeleteLoading}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureRequestDetail;
