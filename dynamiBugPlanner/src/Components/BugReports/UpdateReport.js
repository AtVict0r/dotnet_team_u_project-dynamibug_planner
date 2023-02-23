import "./AddReport.css";
import { BugPlannerApi } from "../../API/apiClient/BugPlannerApi";
import React, { useState } from "react";

const api = new BugPlannerApi({ baseUrl: "https://localhost:7227" });

export default function UpdateReport() {
  const [id] = useState(window.location.search.substring(1));
  const [reportStorage] = useState(JSON.parse(window.sessionStorage.getItem("reportDetail")));
  const [reportType, setReportType] = useState(reportStorage.type);
  const [reportTitle, setReportTitle] = useState(reportStorage.title);
  const [reportDescription, setReportDescription] = useState(reportStorage.description);
  const [reportStatus, setReportStatus] = useState(reportStorage.status);
  const [reportPriority, setReportPriority] = useState(reportStorage.priority);

  const putData = async () => {
    let result = await api.updateReport(Number(reportStorage.id), { 
      type: reportType, 
      status: reportStatus, 
      priority: reportPriority,  
      title: reportTitle, 
      description: reportDescription, 
      modifyDate: new Date().toISOString()
    });
    result
      .json()
      .then(window.location.href = `/Report?${id}`)
      .catch((err) => console.log(err.message));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    putData();
  };

  if (id == reportStorage.id) {
    return (
      <div className="container">
        <h4>Update Report</h4>
        <a href={`/Report?${id}`}>Back to report</a>
        <br />
        <a href="/Browse">Back to list</a>
        <form className="ARcontainer container" onSubmit={handleSubmit}>
          <div>
            <div className="row">
              <label className="ARlabel" htmlFor="reportType">
                Type
              </label>{" "}
              <select
                className="ARinput"
                id="reportType"
                value={reportType}
                onChange={(event) => {
                  setReportType(event.target.value);
                }}
              >
                <option value="Bug">Bug</option>
                <option value="Documentation">Documentation</option>
                <option value="Enhancement">Enhancement</option>
                <option value="Help">Help</option>
                <option value="Question">Question</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="row">
              <label className="ARlabel" htmlFor="reportStatus">
                Status
              </label>{" "}
              <select
                className="ARinput"
                id="reportStatus"
                value={reportStatus}
                onChange={(event) => {
                  setReportStatus(event.target.value);
                }}
              >
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Active">Active</option>
                <option value="Resolved">Resolved</option>
                <option value="Wont Fix">Wont Fix</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className="row">
              <label className="ARlabel" htmlFor="reportPriority">
                Priority
              </label>{" "}
              <select
                className="ARinput"
                id="reportPriority"
                value={reportPriority}
                onChange={(event) => {
                  setReportPriority(event.target.value);
                }}
              >
                <option value="Unconfirmed">Unconfirmed</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Immediate">Immediate</option>
              </select>
            </div>
          </div>
          <div className="row">
            <label className="ARlabel" htmlFor="reportTitle">
              Title
            </label>
            <input
              className="ARinput"
              type="text"
              id="reportTitle"
              value={reportTitle}
              onChange={(event) => {
                setReportTitle(event.target.value);
              }}
              required
            />
          </div>
          <div className="row">
            <label className="ARlabel" htmlFor="reportDescription">
              Description
            </label>
            <textarea
              className="ARinput"
              rows="10"
              cols="70"
              id="reportDescription"
              value={reportDescription}
              onChange={(event) => {
                setReportDescription(event.target.value);
              }}
              required
            ></textarea>
          </div>
          <div className="row">
            <input className="ARinput" type="file" id="fileUpload" multiple />
          </div>
          <div className="row">
            <label className="ARlabel" htmlFor="userIsHuman">
              I am not a robot
            </label>
            <input
              type="checkbox"
              className="ARcheckbox"
              id="userIsHumman"
              value="I am not a robot."
            />
          </div>
          <input
            type="submit"
            className="ARbutton ARinput btn btn-primary"
            value="Update"
          />
        </form>
      </div>
    );
  }
  else {
    window.location.href = `/Report?${reportStorage.id}`;
  }
}
