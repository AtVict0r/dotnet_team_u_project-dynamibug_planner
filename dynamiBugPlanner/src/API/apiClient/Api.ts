/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  CreateBugFixDTO,
  CreateCommentDTO,
  CreateProjectDTO,
  CreateReportDTO,
  ProblemDetails,
  UpdateBugFixDTO,
  UpdateProjectDTO,
  UpdateReportDTO,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {

  /**
   * No description
   *
   * @tags Comments
   * @name CreateComment
   * @request POST:/api/Comments
   */
  createComment = (data: CreateCommentDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Comments`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Comments
   * @name DeleteComment
   * @request DELETE:/api/Comments/{id}
   */
  deleteComment = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Comments/${id}`,
      method: "DELETE",
      ...params,
    });

  /**
   * No description
   *
   * @tags Plans
   * @name GetPlans
   * @request GET:/api/Plans
   */
  getPlans = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/Plans`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Plans
   * @name CreatePlan
   * @request POST:/api/Plans
   */
  createPlan = (data: CreateBugFixDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Plans`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Plans
   * @name GetPlan
   * @request GET:/api/Plans/{id}
   */
  getPlan = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Plans/${id}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Plans
   * @name UpdatePlan
   * @request PUT:/api/Plans/{id}
   */
  updatePlan = (id: number, data: UpdateBugFixDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Plans/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Plans
   * @name DeletePlan
   * @request DELETE:/api/Plans/{id}
   */
  deletePlan = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Plans/${id}`,
      method: "DELETE",
      ...params,
    });

  /**
   * No description
   *
   * @tags Projects
   * @name GetProjects
   * @request GET:/api/Projects
   */
  getProjects = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/Projects`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Projects
   * @name CreateProject
   * @request POST:/api/Projects
   */
  createProject = (data: CreateProjectDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Projects`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Projects
   * @name GetProject
   * @request GET:/api/Projects/{id}
   */
  getProject = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Projects/${id}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Projects
   * @name UpdateProject
   * @request PUT:/api/Projects/{id}
   */
  updateProject = (id: number, data: UpdateProjectDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Projects/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Projects
   * @name DeleteProject
   * @request DELETE:/api/Projects/{id}
   */
  deleteProject = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Projects/${id}`,
      method: "DELETE",
      ...params,
    });

  /**
   * No description
   *
   * @tags Reports
   * @name GetReports
   * @request GET:/api/Reports
   */
  getReports = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/Reports`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Reports
   * @name CreateReport
   * @request POST:/api/Reports
   */
  createReport = (data: CreateReportDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Reports`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Reports
   * @name GetReport
   * @request GET:/api/Reports/{id}
   */
  getReport = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Reports/${id}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Reports
   * @name UpdateReport
   * @request PUT:/api/Reports/{id}
   */
  updateReport = (id: number, data: UpdateReportDTO, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Reports/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
    
  /**
   * No description
   *
   * @tags Reports
   * @name DeleteReport
   * @request DELETE:/api/Reports/{id}
   */
  deleteReport = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/Reports/${id}`,
      method: "DELETE",
      ...params,
    });
}
