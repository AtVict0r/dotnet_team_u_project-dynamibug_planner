import React, { useState } from "react";
import Captcha from "../../CustomCaptcha";

export default function AddProject(api) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const postData = async () => {
    let result = await api.createProject({
      name: projectName,
      description: projectDescription,
      githubId: 0,
    });
    result
      .json()
      .then((data) => (window.location.href = `/Project?${data.id}`))
      .catch((err) => {
        console.log(err.message);
        alert("Failed! Try Again!");
        document.getElementById("userIsHuman").checked = false;
      });
  };

  const handleChange = (tagId) => {
    const list = document.getElementById(tagId).classList;
    if (list.contains("inputWarning")) { list.remove("inputWarning") }
  }

  const handleInvalid = (tagId) => {
    const list = document.getElementById(tagId).classList;
    list.add("inputWarning");
  };

  return (
    <div className="container">
      <h4>Add Report</h4>
      <a href="/Projects">Go to Projects</a>
      <br />
      <a href="/Browse">Go to Reports</a>
      <form className="ARcontainer container" onSubmit={(e) => {
        e.preventDefault();
        postData();
      }}>
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
              handleChange(event.target.id);
            }}
            onInvalid={(event) => handleInvalid(event.target.id)}
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
              handleChange(event.target.id);
            }}
            onInvalid={(event) => handleInvalid(event.target.id)}
            required
          ></textarea>
        </div>
        <Captcha />
        <input
          type="submit"
          className="ARbutton ARinput btn btn-primary"
          value="Add"
        />
      </form>
    </div>
  );
}
