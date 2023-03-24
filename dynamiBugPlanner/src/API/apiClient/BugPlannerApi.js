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
   * @name GetReportComments
   * @request GET:/api/Comments/Report/{id}
   * @response `200` `void` Success
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  getReportComments = (id, params = {}) =>
    this.request({
      path: `/api/Comments/Report/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Comments
   * @name CreateComment
   * @request POST:/api/Comments
   * @secure
   * @response `200` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `void` Forbidden
   * @response `500` `void` Server Error
   */
  createComment = (data, params = {}) =>
    this.request({
      path: `/api/Comments`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Comments
   * @name DeleteComment
   * @request DELETE:/api/Comments/{id}
   * @secure
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  deleteComment = (id, params = {}) =>
    this.request({
      path: `/api/Comments/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Emails
   * @name PostEmail
   * @request POST:/api/Emails
   * @response `200` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  postEmail = (data, params = {}) =>
    this.request({
      path: `/api/Emails`,
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
   * @secure
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  updatePlan = (id, data, params = {}) =>
    this.request({
      path: `/api/Plans/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
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
   * @secure
   * @response `201` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `500` `void` Server Error
   */
  createProject = (data, params = {}) =>
    this.request({
      path: `/api/Projects`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Projects
   * @name GetArchirvedProjects
   * @request GET:/api/Projects/Archived
   * @secure
   * @response `200` `void` Success
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `500` `void` Server Error
   */
  getArchirvedProjects = (params = {}) =>
    this.request({
      path: `/api/Projects/Archived`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Projects
   * @name GetUnArchivedProjects
   * @request GET:/api/Projects/UnArchived
   * @response `200` `void` Success
   * @response `500` `void` Server Error
   */
  getUnArchivedProjects = (params = {}) =>
    this.request({
      path: `/api/Projects/UnArchived`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Projects
   * @name GetProjectNames
   * @request GET:/api/Projects/Names
   * @response `200` `void` Success
   * @response `500` `void` Server Error
   */
  getProjectNames = (params = {}) =>
    this.request({
      path: `/api/Projects/Names`,
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
   * @secure
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  updateProject = (id, data, params = {}) =>
    this.request({
      path: `/api/Projects/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Projects
   * @name DeleteProject
   * @request DELETE:/api/Projects/{id}
   * @secure
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  deleteProject = (id, params = {}) =>
    this.request({
      path: `/api/Projects/${id}`,
      method: "DELETE",
      secure: true,
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
   * @secure
   * @response `201` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `void` Forbidden
   * @response `500` `void` Server Error
   */
  createReport = (data, params = {}) =>
    this.request({
      path: `/api/Reports`,
      method: "POST",
      body: data,
      secure: true,
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
   * @secure
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  updateReport = (id, data, params = {}) =>
    this.request({
      path: `/api/Reports/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reports
   * @name DeleteReport
   * @request DELETE:/api/Reports/{id}
   * @secure
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  deleteReport = (id, params = {}) =>
    this.request({
      path: `/api/Reports/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name GetUsers
   * @request GET:/api/Users
   * @secure
   * @response `200` `void` Success
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `500` `void` Server Error
   */
  getUsers = (params = {}) =>
    this.request({
      path: `/api/Users`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name GetCurrentUser
   * @request GET:/api/Users/User
   * @secure
   * @response `200` `void` Success
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `void` Forbidden
   * @response `500` `void` Server Error
   */
  getCurrentUser = (params = {}) =>
    this.request({
      path: `/api/Users/User`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name GetAdminsUsername
   * @request GET:/api/Users/Admins
   * @response `200` `void` Success
   * @response `500` `void` Server Error
   */
  getAdminsUsername = (params = {}) =>
    this.request({
      path: `/api/Users/Admins`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name GetUserById
   * @request GET:/api/Users/{id}
   * @secure
   * @response `200` `void` Success
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  getUserById = (id, params = {}) =>
    this.request({
      path: `/api/Users/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UpdateUser
   * @request PUT:/api/Users/{id}
   * @secure
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  updateUser = (id, data, params = {}) =>
    this.request({
      path: `/api/Users/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name DeleteUser
   * @request DELETE:/api/Users/{id}
   * @secure
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  deleteUser = (id, params = {}) =>
    this.request({
      path: `/api/Users/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name GetUserByUsername
   * @request GET:/api/Users/{username}
   * @secure
   * @response `200` `void` Success
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `void` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  getUserByUsername = (username, params = {}) =>
    this.request({
      path: `/api/Users/${username}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name CreateUser
   * @request POST:/api/Users/Register
   * @response `201` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `500` `void` Server Error
   */
  createUser = (data, params = {}) =>
    this.request({
      path: `/api/Users/Register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name SignInUser
   * @request POST:/api/Users/Login
   * @response `202` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `500` `void` Server Error
   */
  signInUser = (data, params = {}) =>
    this.request({
      path: `/api/Users/Login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name ManageUser
   * @request PUT:/api/Users/Role/{id}
   * @secure
   * @response `204` `void` Success
   * @response `400` `ProblemDetails` Bad Request
   * @response `401` `ProblemDetails` Unauthorized
   * @response `403` `ProblemDetails` Forbidden
   * @response `404` `ProblemDetails` Not Found
   * @response `500` `void` Server Error
   */
  manageUser = (id, data, params = {}) =>
    this.request({
      path: `/api/Users/Role/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
