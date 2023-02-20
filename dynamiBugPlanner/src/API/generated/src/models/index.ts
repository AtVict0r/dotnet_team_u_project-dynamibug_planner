import * as coreClient from "@azure/core-client";

export interface CreateCommentDTO {
  comment: string;
  bugId?: number;
}

export interface ProblemDetails {
  /** Describes unknown properties. The value of an unknown property can be of "any" type. */
  [property: string]: any;
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

export interface CreateBugFixDTO {
  html?: string;
  bugId?: number;
  userId?: number;
}

export interface UpdateBugFixDTO {
  html?: string;
  bugId?: number;
  userId?: number;
}

export interface CreateProjectDTO {
  name: string;
  description?: string;
  githubId?: number;
}

export interface UpdateProjectDTO {
  name: string;
  description?: string;
  githubId?: number;
  id?: number;
  isArchived?: boolean;
}

export interface CreateReportDTO {
  type: string;
  title: string;
  description: string;
  projectId?: number;
}

export interface UpdateReportDTO {
  type: string;
  title: string;
  description: string;
  projectId?: number;
  id?: number;
  status?: string;
  priority?: string;
  modifyDate?: Date;
}

export interface WeatherForecast {
  date?: Date;
  temperatureC?: number;
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly temperatureF?: number;
  summary?: string;
}

/** Optional parameters. */
export interface CreateCommentOptionalParams
  extends coreClient.OperationOptions {
  body?: CreateCommentDTO;
}

/** Contains response data for the createComment operation. */
export type CreateCommentResponse = ProblemDetails;

/** Optional parameters. */
export interface DeleteCommentOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the deleteComment operation. */
export type DeleteCommentResponse = ProblemDetails;

/** Optional parameters. */
export interface GetPlansOptionalParams extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface CreatePlanOptionalParams extends coreClient.OperationOptions {
  body?: CreateBugFixDTO;
}

/** Contains response data for the createPlan operation. */
export type CreatePlanResponse = ProblemDetails;

/** Optional parameters. */
export interface GetPlanOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the getPlan operation. */
export type GetPlanResponse = ProblemDetails;

/** Optional parameters. */
export interface UpdatePlanOptionalParams extends coreClient.OperationOptions {
  body?: UpdateBugFixDTO;
}

/** Contains response data for the updatePlan operation. */
export type UpdatePlanResponse = ProblemDetails;

/** Optional parameters. */
export interface DeletePlanOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the deletePlan operation. */
export type DeletePlanResponse = ProblemDetails;

/** Optional parameters. */
export interface GetProjectsOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface CreateProjectOptionalParams
  extends coreClient.OperationOptions {
  body?: CreateProjectDTO;
}

/** Contains response data for the createProject operation. */
export type CreateProjectResponse = ProblemDetails;

/** Optional parameters. */
export interface GetProjectOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the getProject operation. */
export type GetProjectResponse = ProblemDetails;

/** Optional parameters. */
export interface UpdateProjectOptionalParams
  extends coreClient.OperationOptions {
  body?: UpdateProjectDTO;
}

/** Contains response data for the updateProject operation. */
export type UpdateProjectResponse = ProblemDetails;

/** Optional parameters. */
export interface DeleteProjectOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the deleteProject operation. */
export type DeleteProjectResponse = ProblemDetails;

/** Optional parameters. */
export interface GetReportsOptionalParams extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface CreateReportOptionalParams
  extends coreClient.OperationOptions {
  body?: CreateReportDTO;
}

/** Contains response data for the createReport operation. */
export type CreateReportResponse = ProblemDetails;

/** Optional parameters. */
export interface GetReportOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the getReport operation. */
export type GetReportResponse = ProblemDetails;

/** Optional parameters. */
export interface UpdateReportOptionalParams
  extends coreClient.OperationOptions {
  body?: UpdateReportDTO;
}

/** Contains response data for the updateReport operation. */
export type UpdateReportResponse = ProblemDetails;

/** Optional parameters. */
export interface DeleteReportOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the deleteReport operation. */
export type DeleteReportResponse = ProblemDetails;

/** Optional parameters. */
export interface GetWeatherForecastOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getWeatherForecast operation. */
export type GetWeatherForecastResponse = WeatherForecast[];

/** Optional parameters. */
export interface DynamiBugPlannerBackendOptionalParams
  extends coreClient.ServiceClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string;
}
