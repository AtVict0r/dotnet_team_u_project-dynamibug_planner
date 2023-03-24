import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function useSessionStorage(key, defaultValue = "") {
  const [state, setState] = useState(() => {
    return JSON.parse(sessionStorage.getItem(key)) || defaultValue;
  });
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default function ProjectDetail({ api, userId, userRole }) {
  const [query] = useState(window.location.search);
  const [projectDetailId] = useState(
    query === null || query === "" ? null : Number(query.substring(1))
  );
  if (projectDetailId === null || isNaN(projectDetailId)) {
    window.location.href = "/Projects";
  } else {
    return (
      <div className="container">
        <h4>Project Detail</h4>
        <a href="/Projects">Go to Projects</a>
        <br />
        <a href="/Browse">Go to Reports</a>
        <DisplayProject
          api={api}
          id={projectDetailId}
          userId={userId}
          userRole={userRole}
        />
      </div>
    );
  }
}

function ShowReportsList({ reports }) {
  const [startLength, setStartLength] = useState(0);

  useEffect(() => {
    if (reports.length < startLength) {
      setStartLength(0);
    }
    const nextButton = document.getElementById("reportsNextButton");
    const previousButton = document.getElementById("reportsPreviousButton");
    if (previousButton != null && nextButton != null) {
      nextButton.disabled = startLength + 10 >= reports.length;
      previousButton.disabled = startLength === 0;
    }
  }, [startLength, reports]);

  const handleButtonClick = (event) => {
    if (
      event.target.id === "reportsNextButton" &&
      startLength + 10 < reports.length
    ) {
      setStartLength(startLength + 10);
    } else if (event.target.id === "reportsPreviousButton" && startLength > 0) {
      setStartLength(startLength - 10);
    }
  };

  if (typeof reports != "undefined" && reports.length > 0) {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Report Title</th>
              <th>Report Type</th>
              <th>Report Status</th>
              <th>Report Priority</th>
              <th>Report Date</th>
            </tr>
          </thead>
          <tbody>
            {reports
              .sort((a, b) => {
                return a.title.localeCompare(b.title);
              })
              .slice(
                startLength,
                reports.length > startLength + 10
                  ? startLength + 10
                  : reports.length
              )
              .map((report) => {
                return (
                  <tr key={report.id}>
                    <td>
                      <a href={`/Report?${report.id}`}>{report.title}</a>
                    </td>
                    <td>{report.type}</td>
                    <td>{report.status}</td>
                    <td>{report.priority}</td>
                    <td>{new Date(report.modifyDate).toLocaleString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            id="reportsPreviousButton"
            type="button"
            value="Previous"
            onClick={handleButtonClick}
          />
          <input
            id="reportsNextButton"
            type="button"
            value="Next"
            style={{ width: "75px" }}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    );
  } else {
    return <p>No information.</p>;
  }
}

function DisplayProject({ api, id, userId, userRole }) {
  const [projectDetail, setProjectDetail] = useSessionStorage("projectDetail", {
    isArchived: false,
    id: 0,
    name: "",
    description: "",
    githubId: null,
    user: { username: "" },
    reports: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getProject(id);
      result
        .json()
        .then((json) => setProjectDetail(json))
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, [api, id, setProjectDetail]);

  const deleteProject = async () => {
    let result = await api.deleteProject(id);
    result
      .json()
      .then((window.location.href = "/Projects"))
      .catch((err) => console.log(err.message));
  };

  const showGithub = () => {
    if (projectDetail.githubId != null) {
      return <p>Showing Information.</p>;
    } else {
      return <p>No information.</p>;
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "1rem" }}>
        {userRole !== "admin" && userId !== projectDetail.userId ? (
          <></>
        ) : (
          <div className="row">
            <a
              className="btn btn-primary RDbutton"
              href={`/EditProject?${projectDetail.id}`}
            >
              Edit Project
            </a>
            <button
              onClick={deleteProject}
              className="btn btn-primary RDbutton"
            >
              Delete Project
            </button>
          </div>
        )}
        <div className="row" style={{ marginTop: "1rem" }}>
          <label className="RDlabel col-15" htmlFor="projectId">
            Id:{" "}
          </label>{" "}
          <input
            type="number"
            id="projectId"
            className="RDinput col-25"
            value={projectDetail.id}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15" htmlFor="projectOwner">
            Username:{" "}
          </label>{" "}
          <input
            type="text"
            id="projectOwner"
            className="RDinput col-25"
            value={projectDetail.user.userName}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15" htmlFor="projectName">
            Title:{" "}
          </label>{" "}
          <input
            type="text"
            id="projectName"
            className="RDinput col-75"
            value={projectDetail.name}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15" htmlFor="projectDescription">
            Description:{" "}
          </label>{" "}
          <textarea
            type="text"
            id="projectDescription"
            rows="10"
            cols="70"
            className="RDinput col-75"
            value={
              projectDetail.description != null ||
              projectDetail.description !== ""
                ? projectDetail.description
                : "No Description"
            }
            readOnly
          />
        </div>
      </div>
      <div className="row">
        <h6>Github Information</h6>
        {showGithub()}
      </div>
      <div className="row">
        <h6>Reports</h6>
        <ShowReportsList reports={projectDetail.reports} />
      </div>
    </div>
  );
}
