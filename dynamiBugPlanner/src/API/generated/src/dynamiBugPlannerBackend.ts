import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import {
  DynamiBugPlannerBackendOptionalParams,
  CreateCommentOptionalParams,
  CreateCommentResponse,
  DeleteCommentOptionalParams,
  DeleteCommentResponse,
  GetPlansOptionalParams,
  CreatePlanOptionalParams,
  CreatePlanResponse,
  GetPlanOptionalParams,
  GetPlanResponse,
  UpdatePlanOptionalParams,
  UpdatePlanResponse,
  DeletePlanOptionalParams,
  DeletePlanResponse,
  GetProjectsOptionalParams,
  CreateProjectOptionalParams,
  CreateProjectResponse,
  GetProjectOptionalParams,
  GetProjectResponse,
  UpdateProjectOptionalParams,
  UpdateProjectResponse,
  DeleteProjectOptionalParams,
  DeleteProjectResponse,
  GetReportsOptionalParams,
  CreateReportOptionalParams,
  CreateReportResponse,
  GetReportOptionalParams,
  GetReportResponse,
  UpdateReportOptionalParams,
  UpdateReportResponse,
  DeleteReportOptionalParams,
  DeleteReportResponse,
  GetWeatherForecastOptionalParams,
  GetWeatherForecastResponse
} from "./models";

export class DynamiBugPlannerBackend extends coreClient.ServiceClient {
  $host: string;

  /**
   * Initializes a new instance of the DynamiBugPlannerBackend class.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor($host: string, options?: DynamiBugPlannerBackendOptionalParams) {
    if ($host === undefined) {
      throw new Error("'$host' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: DynamiBugPlannerBackendOptionalParams = {
      requestContentType: "application/json; charset=utf-8"
    };

    const packageDetails = `azsdk-js-dynamiBugPlannerBackend/1.0.0-beta.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      endpoint: options.endpoint ?? options.baseUri ?? "{$host}"
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] = options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge
          }
        })
      );
    }
    // Parameter assignments
    this.$host = $host;
  }

  /** @param options The options parameters. */
  createComment(
    options?: CreateCommentOptionalParams
  ): Promise<CreateCommentResponse> {
    return this.sendOperationRequest({ options }, createCommentOperationSpec);
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  deleteComment(
    id: number,
    options?: DeleteCommentOptionalParams
  ): Promise<DeleteCommentResponse> {
    return this.sendOperationRequest(
      { id, options },
      deleteCommentOperationSpec
    );
  }

  /** @param options The options parameters. */
  getPlans(options?: GetPlansOptionalParams): Promise<void> {
    return this.sendOperationRequest({ options }, getPlansOperationSpec);
  }

  /** @param options The options parameters. */
  createPlan(options?: CreatePlanOptionalParams): Promise<CreatePlanResponse> {
    return this.sendOperationRequest({ options }, createPlanOperationSpec);
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  getPlan(
    id: number,
    options?: GetPlanOptionalParams
  ): Promise<GetPlanResponse> {
    return this.sendOperationRequest({ id, options }, getPlanOperationSpec);
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  updatePlan(
    id: number,
    options?: UpdatePlanOptionalParams
  ): Promise<UpdatePlanResponse> {
    return this.sendOperationRequest({ id, options }, updatePlanOperationSpec);
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  deletePlan(
    id: number,
    options?: DeletePlanOptionalParams
  ): Promise<DeletePlanResponse> {
    return this.sendOperationRequest({ id, options }, deletePlanOperationSpec);
  }

  /** @param options The options parameters. */
  getProjects(options?: GetProjectsOptionalParams): Promise<void> {
    return this.sendOperationRequest({ options }, getProjectsOperationSpec);
  }

  /** @param options The options parameters. */
  createProject(
    options?: CreateProjectOptionalParams
  ): Promise<CreateProjectResponse> {
    return this.sendOperationRequest({ options }, createProjectOperationSpec);
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  getProject(
    id: number,
    options?: GetProjectOptionalParams
  ): Promise<GetProjectResponse> {
    return this.sendOperationRequest({ id, options }, getProjectOperationSpec);
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  updateProject(
    id: number,
    options?: UpdateProjectOptionalParams
  ): Promise<UpdateProjectResponse> {
    return this.sendOperationRequest(
      { id, options },
      updateProjectOperationSpec
    );
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  deleteProject(
    id: number,
    options?: DeleteProjectOptionalParams
  ): Promise<DeleteProjectResponse> {
    return this.sendOperationRequest(
      { id, options },
      deleteProjectOperationSpec
    );
  }

  /** @param options The options parameters. */
  getReports(options?: GetReportsOptionalParams): Promise<void> {
    return this.sendOperationRequest({ options }, getReportsOperationSpec);
  }

  /** @param options The options parameters. */
  createReport(
    options?: CreateReportOptionalParams
  ): Promise<CreateReportResponse> {
    return this.sendOperationRequest({ options }, createReportOperationSpec);
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  getReport(
    id: number,
    options?: GetReportOptionalParams
  ): Promise<GetReportResponse> {
    return this.sendOperationRequest({ id, options }, getReportOperationSpec);
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  updateReport(
    id: number,
    options?: UpdateReportOptionalParams
  ): Promise<UpdateReportResponse> {
    return this.sendOperationRequest(
      { id, options },
      updateReportOperationSpec
    );
  }

  /**
   * @param id
   * @param options The options parameters.
   */
  deleteReport(
    id: number,
    options?: DeleteReportOptionalParams
  ): Promise<DeleteReportResponse> {
    return this.sendOperationRequest(
      { id, options },
      deleteReportOperationSpec
    );
  }

  /** @param options The options parameters. */
  getWeatherForecast(
    options?: GetWeatherForecastOptionalParams
  ): Promise<GetWeatherForecastResponse> {
    return this.sendOperationRequest(
      { options },
      getWeatherForecastOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createCommentOperationSpec: coreClient.OperationSpec = {
  path: "/api/Comments",
  httpMethod: "POST",
  responses: {
    200: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  requestBody: Parameters.body,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const deleteCommentOperationSpec: coreClient.OperationSpec = {
  path: "/api/Comments/{id}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer
};
const getPlansOperationSpec: coreClient.OperationSpec = {
  path: "/api/Plans",
  httpMethod: "GET",
  responses: { 200: {}, 500: {} },
  urlParameters: [Parameters.$host],
  serializer
};
const createPlanOperationSpec: coreClient.OperationSpec = {
  path: "/api/Plans",
  httpMethod: "POST",
  responses: {
    201: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  requestBody: Parameters.body1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const getPlanOperationSpec: coreClient.OperationSpec = {
  path: "/api/Plans/{id}",
  httpMethod: "GET",
  responses: {
    200: {},
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer
};
const updatePlanOperationSpec: coreClient.OperationSpec = {
  path: "/api/Plans/{id}",
  httpMethod: "PUT",
  responses: {
    204: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  requestBody: Parameters.body2,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const deletePlanOperationSpec: coreClient.OperationSpec = {
  path: "/api/Plans/{id}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer
};
const getProjectsOperationSpec: coreClient.OperationSpec = {
  path: "/api/Projects",
  httpMethod: "GET",
  responses: { 200: {}, 500: {} },
  urlParameters: [Parameters.$host],
  serializer
};
const createProjectOperationSpec: coreClient.OperationSpec = {
  path: "/api/Projects",
  httpMethod: "POST",
  responses: {
    201: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  requestBody: Parameters.body3,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const getProjectOperationSpec: coreClient.OperationSpec = {
  path: "/api/Projects/{id}",
  httpMethod: "GET",
  responses: {
    200: {},
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer
};
const updateProjectOperationSpec: coreClient.OperationSpec = {
  path: "/api/Projects/{id}",
  httpMethod: "PUT",
  responses: {
    204: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  requestBody: Parameters.body4,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const deleteProjectOperationSpec: coreClient.OperationSpec = {
  path: "/api/Projects/{id}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer
};
const getReportsOperationSpec: coreClient.OperationSpec = {
  path: "/api/Reports",
  httpMethod: "GET",
  responses: { 200: {}, 500: {} },
  urlParameters: [Parameters.$host],
  serializer
};
const createReportOperationSpec: coreClient.OperationSpec = {
  path: "/api/Reports",
  httpMethod: "POST",
  responses: {
    201: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  requestBody: Parameters.body5,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const getReportOperationSpec: coreClient.OperationSpec = {
  path: "/api/Reports/{id}",
  httpMethod: "GET",
  responses: {
    200: {},
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer
};
const updateReportOperationSpec: coreClient.OperationSpec = {
  path: "/api/Reports/{id}",
  httpMethod: "PUT",
  responses: {
    204: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  requestBody: Parameters.body6,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const deleteReportOperationSpec: coreClient.OperationSpec = {
  path: "/api/Reports/{id}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    500: {}
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer
};
const getWeatherForecastOperationSpec: coreClient.OperationSpec = {
  path: "/WeatherForecast",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "WeatherForecast" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
