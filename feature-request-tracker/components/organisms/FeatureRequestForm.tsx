"use client";

import React, { useState } from "react";
import { featureRequestApiApi } from "../../services/featureRequestApi";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation";
import Select from "../atoms/Select";

const FeatureRequestForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [createFeatureRequest, { isLoading, isSuccess, isError, error }] =
    featureRequestApiApi.usePostFeatureRequestsMutation();
  const router = useRouter();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!requestedBy) newErrors.requestedBy = "Requested by is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    await createFeatureRequest({
      body: { title, description, requestedBy, priority: priority as any },
    });
  };

  if (isSuccess) {
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Create a New Feature Request
        </h2>
        <p className="text-sm text-gray-600">
          Fill out the form below to submit a new feature request.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          required
        />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          required
        />
        <Input
          label="Requested By"
          value={requestedBy}
          onChange={(e) => setRequestedBy(e.target.value)}
          error={errors.requestedBy}
          required
        />
        <Select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
      {isError && (
        <p className="text-red-500 text-sm">
          An unexpected error occurred: {JSON.stringify(error)}
        </p>
      )}
    </form>
  );
};

export default FeatureRequestForm;
