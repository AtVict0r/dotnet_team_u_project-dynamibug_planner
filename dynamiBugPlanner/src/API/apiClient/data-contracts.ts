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

export interface CreateBugFixDTO {
  html?: string | null;
  /** @format int64 */
  bugId?: number;
  /** @format int64 */
  userId?: number;
}

export interface CreateCommentDTO {
  /** @format multiline */
  comment: string;
  /** @format int64 */
  bugId?: number;
}

export interface CreateProjectDTO {
  name: string;
  description?: string | null;
  /** @format int64 */
  githubId?: number | null;
}

export interface CreateReportDTO {
  type: string;
  title: string;
  description: string;
  /** @format int64 */
  projectId?: number;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface UpdateBugFixDTO {
  html?: string | null;
  /** @format int64 */
  bugId?: number;
  /** @format int64 */
  userId?: number;
}

export interface UpdateProjectDTO {
  name: string;
  description?: string | null;
  /** @format int64 */
  githubId?: number | null;
  /** @format int64 */
  id?: number;
  isArchived?: boolean;
}

export interface UpdateReportDTO {
  type: string;
  title: string;
  description: string;
  /** @format int64 */
  projectId?: number;
  /** @format int64 */
  id?: number;
  status?: string | null;
  priority?: string | null;
  /** @format date-time */
  modifyDate?: string;
}
