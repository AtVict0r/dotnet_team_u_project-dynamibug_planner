import { OperationParameter, OperationURLParameter } from "@azure/core-client";
import {
  CreateCommentDTO as CreateCommentDTOMapper,
  CreateBugFixDTO as CreateBugFixDTOMapper,
  UpdateBugFixDTO as UpdateBugFixDTOMapper,
  CreateProjectDTO as CreateProjectDTOMapper,
  UpdateProjectDTO as UpdateProjectDTOMapper,
  CreateReportDTO as CreateReportDTOMapper,
  UpdateReportDTO as UpdateReportDTOMapper
} from "../models/mappers";

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json-patch+json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const body: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: CreateCommentDTOMapper
};

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json, text/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const id: OperationURLParameter = {
  parameterPath: "id",
  mapper: {
    serializedName: "id",
    required: true,
    type: {
      name: "Number"
    }
  }
};

export const body1: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: CreateBugFixDTOMapper
};

export const body2: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UpdateBugFixDTOMapper
};

export const body3: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: CreateProjectDTOMapper
};

export const body4: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UpdateProjectDTOMapper
};

export const body5: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: CreateReportDTOMapper
};

export const body6: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UpdateReportDTOMapper
};
