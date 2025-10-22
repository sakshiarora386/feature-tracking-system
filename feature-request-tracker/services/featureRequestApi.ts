import { emptyApi as api } from "./emptyApi";
export const addTagTypes = ["Feature Requests"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      postFeatureRequests: build.mutation<
        PostFeatureRequestsApiResponse,
        PostFeatureRequestsApiArg
      >({
        query: (queryArg) => ({
          url: `/feature-requests`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Feature Requests"],
      }),
      getFeatureRequests: build.query<
        GetFeatureRequestsApiResponse,
        GetFeatureRequestsApiArg
      >({
        query: (queryArg) => ({
          url: `/feature-requests`,
          params: {
            sortBy:
              queryArg.sortBy != null
                ? encodeURIComponent(String(queryArg.sortBy))
                : undefined,
            sortOrder:
              queryArg.sortOrder != null
                ? encodeURIComponent(String(queryArg.sortOrder))
                : undefined,
            status:
              queryArg.status != null
                ? encodeURIComponent(String(queryArg.status))
                : undefined,
            priority:
              queryArg.priority != null
                ? encodeURIComponent(String(queryArg.priority))
                : undefined,
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            limit:
              queryArg.limit != null
                ? encodeURIComponent(String(queryArg.limit))
                : undefined,
          },
        }),
        providesTags: ["Feature Requests"],
      }),
      getFeatureRequestsById: build.query<
        GetFeatureRequestsByIdApiResponse,
        GetFeatureRequestsByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/feature-requests/${encodeURIComponent(String(queryArg))}`,
        }),
        providesTags: ["Feature Requests"],
      }),
      deleteFeatureRequestsById: build.mutation<
        DeleteFeatureRequestsByIdApiResponse,
        DeleteFeatureRequestsByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/feature-requests/${encodeURIComponent(String(queryArg))}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Feature Requests"],
      }),
      putFeatureRequestsByIdStatus: build.mutation<
        PutFeatureRequestsByIdStatusApiResponse,
        PutFeatureRequestsByIdStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/feature-requests/${encodeURIComponent(String(queryArg.id))}/status`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Feature Requests"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as featureRequestApiApi };
export type PostFeatureRequestsApiResponse =
  /** status 201 Feature request created successfully */ FeatureRequest;
export type PostFeatureRequestsApiArg = {
  title: string;
  description: string;
  requestedBy?: string;
  priority?: "Low" | "Medium" | "High" | "Critical";
};
export type GetFeatureRequestsApiResponse =
  /** status 200 List of feature requests */ {
    data?: FeatureRequest[];
    pagination?: {
      totalItems?: number;
      currentPage?: number;
      totalPages?: number;
      itemsPerPage?: number;
    };
  };
export type GetFeatureRequestsApiArg = {
  /** Field to sort by */
  sortBy?: "title" | "status" | "priority" | "createdAt";
  /** Sort order */
  sortOrder?: "asc" | "desc";
  /** Filter by status */
  status?:
    | "New"
    | "Open"
    | "InProgress"
    | "UnderReview"
    | "Completed"
    | "Rejected";
  /** Filter by priority */
  priority?: "Low" | "Medium" | "High" | "Critical";
  /** Page number */
  page?: number;
  /** Number of items per page */
  limit?: number;
};
export type GetFeatureRequestsByIdApiResponse =
  /** status 200 Feature request details */ FeatureRequest;
export type GetFeatureRequestsByIdApiArg = /** Feature request ID */ string;
export type DeleteFeatureRequestsByIdApiResponse = unknown;
export type DeleteFeatureRequestsByIdApiArg = /** Feature request ID */ string;
export type PutFeatureRequestsByIdStatusApiResponse =
  /** status 200 Status updated successfully */ FeatureRequest;
export type PutFeatureRequestsByIdStatusApiArg = {
  /** Feature request ID */
  id: string;
  body: {
    status:
      | "New"
      | "Open"
      | "InProgress"
      | "UnderReview"
      | "Completed"
      | "Rejected";
  };
};
export type FeatureRequest = {
  /** The auto-generated ID of the feature request */
  id?: string;
  /** The title of the feature request */
  title: string;
  /** Detailed description of the feature */
  description: string;
  /** User who requested the feature */
  requestedBy?: string;
  /** Priority level of the feature request */
  priority?: "Low" | "Medium" | "High" | "Critical";
  /** Current status of the feature request */
  status?:
    | "New"
    | "Open"
    | "InProgress"
    | "UnderReview"
    | "Completed"
    | "Rejected";
  /** Timestamp of creation */
  createdAt?: string;
  /** Timestamp of last update */
  updatedAt?: string;
  /** User who last updated the request */
  updatedBy?: string;
};
