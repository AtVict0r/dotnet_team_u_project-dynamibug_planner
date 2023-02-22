import "./AddReport.css";
import { BugPlannerApi } from "../../API/apiClient/BugPlannerApi";
import React, { useEffect, useState } from "react";

const api = new BugPlannerApi({ baseUrl: "https://localhost:7227" });

export default function AddReport() {
  const [listProject, setListProject] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [reportType, setReportType] = useState("Bug");
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  let listProjects = () => {
    return listProject.map((projectName) => {
      return (
        <option key={projectName.id} value={projectName.id}>
          {projectName.name}
        </option>
      );
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getProjectNames();
      result
        .json()
        .then((json) => setListProject(json))
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, []);

   const postData = async () => {
    let result = await api.createReport({
      projectId: Number(projectId),
      type: reportType,
      title: reportTitle,
      description: reportDescription,
    });
    result
      .json()
      .then((data) => window.location.href = `/Report?${data.id}`)
      .catch((err) => console.log(err.message));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <form className="ARcontainer container" onSubmit={handleSubmit}>
      <div>
        <div className="row">
          <label className="ARlabel" htmlFor="projectId">
            Project
          </label>
          <select
            className="ARinput"
            id="projectId"
            onChange={(event) => {
              setProjectId(event.target.value);
            }}
            required
          >
            <option value=""></option>
            {listProjects(listProject)}
          </select>
        </div>
        <div className="row">
          <label className="ARlabel" htmlFor="reportType">
            Type
          </label>
          <select
            className="ARinput"
            id="reportType"
            onChange={(event) => {
              setReportType(event.target.value);
            }}
          >
            <option value="Bug">Bug</option>
            <option value="Documentation">Documentation</option>
            <option value="Enhancement">Enhancement</option>
            <option value="Help">Help</option>
            <option value="Question">Question</option>
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
      <a href="/Report">
        <input
          type="submit"
          className="ARbutton ARinput btn btn-primary"
          value="Add"
        />
      </a>
    </form>
  );
}
