import React, { useState } from "react";
import Captcha from "../../CustomCaptcha";

export default function AddProject({api}) {
  const [id] = useState(window.location.search.substring(1));
  const [projectStorage] = useState(JSON.parse(window.sessionStorage.getItem("projectDetail")));
  const [projectName, setProjectName] = useState(projectStorage.name);
  const [projectDescription, setProjectDescription] = useState(projectStorage.description);

  const putData = async () => {
    let result = await api.updateProject(Number(projectStorage.id), {
      name: projectName,
      description: projectDescription,
    });
    result
      .json()
      .then(window.location.href = `/Project?${id}`)
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

  if (id == projectStorage.id) {
    return (
      <div className="container">
        <h4>Edit Project</h4>
        <a href={`/Project?${id}`}>Back to Project</a>
        <br />
        <a href="/Projects">Go to Projects</a>
        <br />
        <a href="/Browse">Go to Reports</a>
        <br />
        <form className="ARcontainer container" onSubmit={(e) => {
          e.preventDefault();
          putData();
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
              onInvalid={(event) => handleInvalid(event.target.id) }
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
              onInvalid={(event) => handleInvalid(event.target.id) }
              required
            ></textarea>
          </div>
          <Captcha />
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
    window.location.href = `/Project?${projectStorage.id}`;
  }
}
