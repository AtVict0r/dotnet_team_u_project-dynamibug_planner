import "./Browse.css";
import React, { useEffect, useState } from "react";
import ListReports from "./ListReports";

function ListProjectName({ projectNames }) {
  return projectNames.map((projectName) => {
    return (
      <option key={projectName.id} value={projectName.name}>
        {projectName.name}
      </option>
    );
  });
}

function ReportTable({ api }) {
  const [projectName, setProjectName] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportStatus, setReportStatus] = useState("");
  const [reportPriority, setReportPriority] = useState("");
  const [reports, setReports] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [reportTitle] = useState(window.sessionStorage.getItem("navSearchBar"));

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getReports();
      result
        .json()
        .then((json) => {
          setReports(json);
        })
        .catch((err) => console.log(err.message));

      result = await api.getProjectNames();
      result
        .json()
        .then((json) => {
          setListProject(json);
        })
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, []);

  let filteredReports = reports;
  if (reportTitle !== null && reportTitle !== "") {
    filteredReports = filteredReports.filter((report) => {
      return report.title.toLowerCase().includes(reportTitle.toLowerCase());
    });
  }
  if (projectName !== null && projectName !== "") {
    filteredReports = filteredReports.filter((report) => {
      return report.project.name === projectName;
    });
  }
  if (reportType !== null && reportType !== "") {
    filteredReports = filteredReports.filter((report) => {
      return report.type === reportType;
    });
  }
  if (reportStatus !== null && reportStatus !== "") {
    filteredReports = filteredReports.filter((report) => {
      return report.status === reportStatus;
    });
  }
  if (reportPriority !== null && reportPriority !== "") {
    filteredReports = filteredReports.filter((report) => {
      return report.priority === reportPriority;
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-25">
          <label className="Blabel" htmlFor="projectName">
            Project:{" "}
          </label>
          <select
            id="projectName"
            value={projectName}
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
          >
            <option value="">All</option>
            <ListProjectName projectNames={listProject} />
          </select>
        </div>
        <div className="col-25">
          <label className="Blabel" htmlFor="reportType">
            Type:{" "}
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={(event) => {
              setReportType(event.target.value);
            }}
          >
            <option value="">All</option>
            <option value="Bug">Bug</option>
            <option value="Documentation">Documentation</option>
            <option value="Enhancement">Enhancement</option>
            <option value="Help">Help</option>
            <option value="Question">Question</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-25">
          <label className="Blabel" htmlFor="reportStatus">
            Status:{" "}
          </label>
          <select
            id="reportStatus"
            value={reportStatus}
            onChange={(event) => {
              setReportStatus(event.target.value);
            }}
          >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Active">Active</option>
            <option value="Resolved">Resolved</option>
            <option value="Wont Fix">Wont Fix</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
        <div className="col-25">
          <label className="Blabel" htmlFor="reportPriority">
            Priority:{" "}
          </label>
          <select
            id="reportPriority"
            value={reportPriority}
            onChange={(event) => {
              setReportPriority(event.target.value);
            }}
          >
            <option value="">All</option>
            <option value="Unconfirmed">Unconfirmed</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Immediate">Immediate</option>
          </select>
        </div>
      </div>
      <br />
      <a href="/NewReport">Create New Bug Report</a>
      <br />
      <ListReports reports={filteredReports} />
    </>
  );
}

export default function Browse({ api }) {
  return (
    <div className="container">
      <h1>Browse</h1>
      <ReportTable api={api} />
    </div>
  );
}
