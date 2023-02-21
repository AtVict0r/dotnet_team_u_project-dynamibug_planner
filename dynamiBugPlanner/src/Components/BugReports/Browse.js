import "./Browse.css";
import { BugPlannerApi } from "../../API/apiClient/BugPlannerApi";
import React, { useEffect, useState } from "react";

const api = new BugPlannerApi({ baseUrl: "https://localhost:7227" });

function useSessionStorage(key, defaultValue = "") {
  const [state, setState] = useState(() => {
    return window.sessionStorage.getItem(key) || defaultValue;
  });
  useEffect(() => {
    window.sessionStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}

function ListProjectName({ projectNames }) {
  return projectNames.map((projectName) => {
    return (
      <option key={projectName.id} value={projectName.name}>
        {projectName.name}
      </option>
    );
  });
}

function ReportTable() {
  const [projectName, setProjectName] = useSessionStorage("projectName");
  const [reportType, setReportType] = useSessionStorage("reportType");
  const [reportStatus, setReportStatus] = useSessionStorage("reportStatus");
  const [reportPriority, setReportPriority] =
    useSessionStorage("reportPriority");
  const [reports, setReports] = useState([]);
  const [listProject, setListProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getReports();
      result.json().then((json) => {
        setReports(json);
      });

      result = await api.getProjectNames();
      result.json().then((json) => {
        setListProject(json);
      });
    };
    fetchData();
  }, []);

  let filteredReports = reports;
  let sessionReportTitle = sessionStorage.getItem("navSearchBar");
  if (sessionReportTitle != null && sessionReportTitle != "") {
    filteredReports = filteredReports.filter((report) => {
      return report.title.includes(sessionReportTitle);
    });
    // sessionStorage.setItem("navSearchBar", "");
  }
  if (projectName != null && projectName != "") {
    filteredReports = filteredReports.filter((report) => {
      return report.project.name == projectName;
    });
  }
  if (reportType != null && reportType != "") {
    filteredReports = filteredReports.filter((report) => {
      return report.type == reportType;
    });
  }
  if (reportStatus != null && reportStatus != "") {
    filteredReports = filteredReports.filter((report) => {
      return report.status == reportStatus;
    });
  }
  if (reportPriority != null && reportPriority != "") {
    filteredReports = filteredReports.filter((report) => {
      return report.priority == reportPriority;
    });
  }

  let listReports = filteredReports.map((report) => {
    const date = new Date(report.modifyDate);
    return (
      <tr key={report.id}>
        <td>{report.project.name}</td>
        <td>{report.title}</td>
        <td>{report.type}</td>
        <td>{report.status}</td>
        <td>{report.priority}</td>
        <td>{date.toLocaleString()}</td>
      </tr>
    );
  });

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
      <a href="/Add">Create New Bug Report</a>
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Report Title</th>
              <th>Report Type</th>
              <th>Report Status</th>
              <th>Report Priority</th>
              <th>Report Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{listReports}</tbody>
        </table>
      </div>
    </>
  );
}

export default function Browse() {
  return (
    <div className="container">
      <h1>Browse</h1>
      <ReportTable />
    </div>
  );
}
