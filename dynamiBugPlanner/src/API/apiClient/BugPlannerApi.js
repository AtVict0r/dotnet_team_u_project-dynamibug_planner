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

import { ContentType, HttpClient } from "./http-client";
export class BugPlannerApi extends HttpClient {
  /**
   * No description
   *
   * @tags Comments
   * @name GetComment
   * @request GET:/api/Comments/{id}
   * @response `200` `void` Success
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  getComment = (id, params = {}) =>
    this.request({
      path: `/api/Comments/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Comments
   * @name DeleteComment
   * @request DELETE:/api/Comments/{id}
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  deleteComment = (id, params = {}) =>
    this.request({
      path: `/api/Comments/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Comments
   * @name CreateComment
   * @request POST:/api/Comments
   * @response `200` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `500` `void` Server Error
   */
  createComment = (data, params = {}) =>
    this.request({
      path: `/api/Comments`,
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
   * @response `200` `void` Success
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  getPlan = (id, params = {}) =>
    this.request({
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
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  updatePlan = (id, data, params = {}) =>
    this.request({
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
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  deletePlan = (id, params = {}) =>
    this.request({
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
   * @response `200` `void` Success
   * @response `500` `void` Server Error
   */
  getProjects = (params = {}) =>
    this.request({
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
   * @response `201` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `500` `void` Server Error
   */
  createProject = (data, params = {}) =>
    this.request({
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
   * @name GetProjectNames
   * @request GET:/api/Projects/{names}
   * @response `200` `void` Success
   * @response `500` `void` Server Error
   */
  getProjectNames = (params = {}) =>
    this.request({
      path: `/api/Projects/names`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Projects
   * @name GetProject
   * @request GET:/api/Projects/{id}
   * @response `200` `void` Success
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  getProject = (id, params = {}) =>
    this.request({
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
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  updateProject = (id, data, params = {}) =>
    this.request({
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
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  deleteProject = (id, params = {}) =>
    this.request({
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
   * @response `200` `void` Success
   * @response `500` `void` Server Error
   */
  getReports = (params = {}) =>
    this.request({
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
   * @response `201` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `500` `void` Server Error
   */
  createReport = (data, params = {}) =>
    this.request({
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
   * @response `200` `void` Success
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  getReport = (id, params = {}) =>
    this.request({
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
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  updateReport = (id, data, params = {}) =>
    this.request({
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
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  deleteReport = (id, params = {}) =>
    this.request({
      path: `/api/Reports/${id}`,
      method: "DELETE",
      ...params,
    });
}
