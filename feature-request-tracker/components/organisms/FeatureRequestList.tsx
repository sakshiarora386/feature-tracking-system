"use client";

import React, { useState } from "react";
import {
  featureRequestApiApi,
  GetFeatureRequestsApiArg,
} from "../../services/featureRequestApi";
import FeatureRequestCard from "../moleles/FeatureRequestCard";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import Link from "next/link";

const FeatureRequestList: React.FC = () => {
  const [sortBy, setSortBy] =
    useState<GetFeatureRequestsApiArg["sortBy"]>("createdAt");
  const [sortOrder, setSortOrder] =
    useState<GetFeatureRequestsApiArg["sortOrder"]>("desc");
  const [status, setStatus] = useState<GetFeatureRequestsApiArg["status"]>();
  const [priority, setPriority] =
    useState<GetFeatureRequestsApiArg["priority"]>();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, error, isLoading, isFetching } =
    featureRequestApiApi.useGetFeatureRequestsQuery({
      sortBy,
      sortOrder,
      status,
      priority,
      page,
      limit,
    });

  const handleReset = () => {
    setSortBy("createdAt");
    setSortOrder("desc");
    setStatus(undefined);
    setPriority(undefined);
    setPage(1);
  };

  const renderEmptyState = () => (
    <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No feature requests</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new feature request.
      </p>
      <div className="mt-6">
        <Link
          href="/feature-requests/create"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Feature Request
        </Link>
      </div>
    </div>
  );

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-xl font-bold text-red-700">Error</h2>
      <p className="text-red-600">Error loading feature requests.</p>
    </div>
  );

  const totalItems = data?.data?.pagination?.totalItems || 0;
  const totalPages = data?.data?.pagination?.totalPages || 1;
  const currentPage = data?.data?.pagination?.currentPage || 1;
  const hasItems = data?.data?.items && data.data.items.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Filters */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Sort By"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as GetFeatureRequestsApiArg["sortBy"])
              }
            >
              <option value="title">Title</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="createdAt">Created At</option>
            </Select>
            <Select
              label="Order"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value as GetFeatureRequestsApiArg["sortOrder"],
                )
              }
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Select>
            <Select
              label="Status"
              value={status || ""}
              onChange={(e) =>
                setStatus(
                  (e.target.value as GetFeatureRequestsApiArg["status"]) ||
                    undefined,
                )
              }
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="InProgress">In Progress</option>
              <option value="UnderReview">Under Review</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </Select>
            <Select
              label="Priority"
              value={priority || ""}
              onChange={(e) =>
                setPriority(
                  (e.target.value as GetFeatureRequestsApiArg["priority"]) ||
                    undefined,
                )
              }
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isFetching && (
          <div className="absolute top-0 left-0 right-0 h-1">
            <div className="h-full bg-blue-500 animate-pulse"></div>
          </div>
        )}
        
        {!hasItems && renderEmptyState()}
        
        {hasItems && (
          <div className="space-y-4">
            {data?.data?.items?.map((request) => (
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
        )}
      </div>

      {/* Pagination */}
      {hasItems && totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * limit, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <div className="flex items-center">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 mx-1 text-sm rounded-md ${
                      pageNum === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <Button
              variant="secondary"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureRequestList;
