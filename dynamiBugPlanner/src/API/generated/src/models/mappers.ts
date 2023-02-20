import * as coreClient from "@azure/core-client";

export const CreateCommentDTO: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CreateCommentDTO",
    modelProperties: {
      comment: {
        serializedName: "comment",
        required: true,
        type: {
          name: "String"
        }
      },
      bugId: {
        serializedName: "bugId",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const ProblemDetails: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ProblemDetails",
    additionalProperties: { type: { name: "Object" } },
    modelProperties: {
      type: {
        serializedName: "type",
        nullable: true,
        type: {
          name: "String"
        }
      },
      title: {
        serializedName: "title",
        nullable: true,
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        nullable: true,
        type: {
          name: "Number"
        }
      },
      detail: {
        serializedName: "detail",
        nullable: true,
        type: {
          name: "String"
        }
      },
      instance: {
        serializedName: "instance",
        nullable: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const CreateBugFixDTO: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CreateBugFixDTO",
    modelProperties: {
      html: {
        serializedName: "html",
        nullable: true,
        type: {
          name: "String"
        }
      },
      bugId: {
        serializedName: "bugId",
        type: {
          name: "Number"
        }
      },
      userId: {
        serializedName: "userId",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const UpdateBugFixDTO: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateBugFixDTO",
    modelProperties: {
      html: {
        serializedName: "html",
        nullable: true,
        type: {
          name: "String"
        }
      },
      bugId: {
        serializedName: "bugId",
        type: {
          name: "Number"
        }
      },
      userId: {
        serializedName: "userId",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const CreateProjectDTO: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CreateProjectDTO",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        nullable: true,
        type: {
          name: "String"
        }
      },
      githubId: {
        serializedName: "githubId",
        nullable: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const UpdateProjectDTO: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateProjectDTO",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        nullable: true,
        type: {
          name: "String"
        }
      },
      githubId: {
        serializedName: "githubId",
        nullable: true,
        type: {
          name: "Number"
        }
      },
      id: {
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      isArchived: {
        serializedName: "isArchived",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const CreateReportDTO: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CreateReportDTO",
    modelProperties: {
      type: {
        serializedName: "type",
        required: true,
        type: {
          name: "String"
        }
      },
      title: {
        serializedName: "title",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        required: true,
        type: {
          name: "String"
        }
      },
      projectId: {
        serializedName: "projectId",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const UpdateReportDTO: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateReportDTO",
    modelProperties: {
      type: {
        serializedName: "type",
        required: true,
        type: {
          name: "String"
        }
      },
      title: {
        serializedName: "title",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        required: true,
        type: {
          name: "String"
        }
      },
      projectId: {
        serializedName: "projectId",
        type: {
          name: "Number"
        }
      },
      id: {
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      status: {
        serializedName: "status",
        nullable: true,
        type: {
          name: "String"
        }
      },
      priority: {
        serializedName: "priority",
        nullable: true,
        type: {
          name: "String"
        }
      },
      modifyDate: {
        serializedName: "modifyDate",
        type: {
          name: "DateTime"
        }
      }
    }
  }
};

export const WeatherForecast: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "WeatherForecast",
    modelProperties: {
      date: {
        serializedName: "date",
        type: {
          name: "DateTime"
        }
      },
      temperatureC: {
        serializedName: "temperatureC",
        type: {
          name: "Number"
        }
      },
      temperatureF: {
        serializedName: "temperatureF",
        readOnly: true,
        type: {
          name: "Number"
        }
      },
      summary: {
        serializedName: "summary",
        nullable: true,
        type: {
          name: "String"
        }
      }
    }
  }
};
