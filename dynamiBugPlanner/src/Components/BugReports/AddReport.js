export default function AddReport() {
  return (
    <>
      <div>
        <div>
          <label htmlFor="projectName">Project</label>
          <select id="projectName">
            <option value="project1">Project 1</option>
            <option value="project2">Project 2</option>
            <option value="project3">Project 3</option>
            <option value="project4">Project 4</option>
            <option value="project5">Project 5</option>
            <option value="project6">Project 6</option>
            <option value="project7">Project 7</option>
            <option value="project8">Project 8</option>
            <option value="project9">Project 9</option>
          </select>
        </div>
        <div>
          <label htmlFor="reportType">Type</label>
          <select id="reportType">
            <option value="Bug">Bug</option>
            <option value="Documentation">Documentation</option>
            <option value="Enhancement">Enhancement</option>
            <option value="Help">Help</option>
            <option value="Question">Question</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="reportTitle">Title</label>
        <input type="text" id="reportTitle" />
      </div>
      <div>
        <label htmlFor="reportDescription">Description</label>
        <textarea id="reportDescription"></textarea>
      </div>
      <button type="button" className="btn btn-primary">
        Upload Media
      </button>
      <div>
        <input type="checkbox" id="userIsHumman" value="I am not a robot." />
        <label htmlFor="userIsHuman">I am not a robot</label>
      </div>
      <button type="button" className="btn btn-primary">Add</button>
    </>
  );
}
