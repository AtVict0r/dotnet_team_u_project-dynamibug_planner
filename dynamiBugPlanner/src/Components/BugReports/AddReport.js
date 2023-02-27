import "./AddReport.css";
import React, { useEffect, useState } from "react";
import Captcha from "../CustomCaptcha";

export default function AddReport({ api, user }) {
  const [listProject, setListProject] = useState([]);
  const [projectId, setProjectId] = useState("");
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
      userId: Number(user.id),
      type: reportType,
      title: reportTitle,
      description: reportDescription,
      projectId: Number(projectId),
      createDate: new Date().toISOString()
    });
    result
      .json()
      .then((data) => window.location.href = `/Report?${data.id}`)
      .catch((err) => {
        console.log(err.message)
        alert("Failed! Try Again!");
        document.getElementById("userIsHuman").checked = false;
      });
  }

  const handleChange = (tagId) => {
    const list = document.getElementById(tagId).classList;
    if (list.contains("inputWarning")) { list.remove("inputWarning") }
  }

  const handleInvalid = (tagId) => {
    const list = document.getElementById(tagId).classList;
    list.add("inputWarning");
  };

  return (
    <form className="ARcontainer container" onSubmit={(e) => {e.preventDefault(); postData()}}>
      <div>
        <div className="row">
          <label className="ARlabel" htmlFor="projectId">
            Project
          </label>
          <select
            className="ARinput"
            id="projectId"
            name="projectId"
            value={projectId}
            onChange={(event) => {
              setProjectId(event.target.value);
              handleChange(event.target.id);
            }}
            onInvalid={(event) => { handleInvalid(event.target.id) }}
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
            name="reportType"
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
          name="reportTitle"
          value={reportTitle}
          onChange={(event) => {
            setReportTitle(event.target.value);
            handleChange(event.target.id);
          }}
          onInvalid={(event) => handleInvalid(event.target.id) }
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
          name="reportDescription"
          value={reportDescription}
          onChange={(event) => {
            setReportDescription(event.target.value);
            handleChange(event.target.id);
          }}
          onInvalid={(event) => handleInvalid(event.target.id) }
          required
        ></textarea>
      </div>
      <div className="row">
        <input className="ARinput" type="file" id="fileUpload" name="fileUpload" multiple />
      </div>
      <Captcha />
      <input
        type="submit"
        className="ARbutton ARinput btn btn-primary"
        value="Add"
      />
    </form>
  );
}
