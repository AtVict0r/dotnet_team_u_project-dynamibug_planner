import "./AddReport.css";

export default function AddReport() {
    return (
        <form className="ARcontainer container">
            <div>
                <div className="row">
                    <label className="ARlabel" htmlFor="projectName">
                        Project
                    </label>
                    <select className="ARinput" id="projectName">
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
                <div className="row">
                    <label className="ARlabel" htmlFor="reportType">
                        Type
                    </label>
                    <select className="ARinput" id="reportType">
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
                <input className="ARinput" type="text" id="reportTitle" />
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
            <div className="row">
                <input type="submit" className="ARbutton ARinput btn btn-primary" value="Add" />
            </div>
        </form>
    );
}
