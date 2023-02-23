import { BugPlannerApi } from "../../../API/apiClient/BugPlannerApi";
import React, { useState } from "react";

const api = new BugPlannerApi({ baseUrl: "https://localhost:7227" });

export default function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGithubId] = useState(0);

  const postData = async () => {
    let result = await api.createProject({
      name: projectName,
      description: projectDescription,
      githubId: projectGithubId,
    });
    result
      .json()
      .then((data) => (window.location.href = `/Project?${data.id}`))
      .catch((err) => console.log(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div className="container">
      <h4>Add Report</h4>
      <form className="ARcontainer container" onSubmit={handleSubmit}>
        <div className="row">
          <label className="ARlabel" htmlFor="projectName">
            Name
          </label>
          <input
            className="ARinput"
            type="text"
            id="projectName"
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
            value={projectName}
            required
          />
        </div>
        <div className="row">
          <label className="ARlabel" htmlFor="projectDescription">
            Description
          </label>
          <textarea
            className="ARinput"
            rows="10"
            cols="70"
            id="projectDescription"
            value={projectDescription}
            onChange={(event) => {
              setProjectDescription(event.target.value);
            }}
          ></textarea>
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
            value="Add"
          />
      </form>
    </div>
  );
}
