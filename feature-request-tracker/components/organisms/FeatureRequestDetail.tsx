"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  featureRequestApiApi,
  GetFeatureRequestsApiArg,
} from "../../services/featureRequestApi";
import Button from "../atoms/Button";
import Select from "../atoms/Select";

interface FeatureRequestDetailProps {
  id: string;
}

const FeatureRequestDetail: React.FC<FeatureRequestDetailProps> = ({ id }) => {
  const router = useRouter();
  const {
    data: featureRequestResponse,
    error,
    isLoading,
  } = featureRequestApiApi.useGetFeatureRequestsByIdQuery({ id });
  const [updateStatus] =
    featureRequestApiApi.usePutFeatureRequestsByIdStatusMutation();
  const [deleteFeatureRequest] =
    featureRequestApiApi.useDeleteFeatureRequestsByIdMutation();

  const featureRequest = featureRequestResponse?.data;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as GetFeatureRequestsApiArg["status"];
    if (newStatus) {
      updateStatus({ id, body: { status: newStatus } });
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this feature request?")
    ) {
      await deleteFeatureRequest({ id });
      router.push("/");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading feature request.</p>;
  if (!featureRequest) return <p>Feature request not found.</p>;

  return (
    <div className="p-4 border rounded-md">
      <h1 className="text-2xl font-bold mb-2">{featureRequest.title}</h1>
      <p className="text-gray-700 mb-4">{featureRequest.description}</p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p>
            <strong>Requested By:</strong> {featureRequest.requestedBy}
          </p>
          <p>
            <strong>Priority:</strong> {featureRequest.priority}
          </p>
        </div>
        <div>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(featureRequest.createdAt!).toLocaleDateString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(featureRequest.updatedAt!).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-4">
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
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default FeatureRequestDetail;
