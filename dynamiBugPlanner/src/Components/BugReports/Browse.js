import './Browse.css';

export default function Browse() {
    return (
        <div className="container">
            <h1>Browse</h1>
            <div className="row">
                <div className="col-25">
                    <label className="Blabel" htmlFor="projectName">Project: </label>
                    <select id="projectName">
                        <option value="">All</option>
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
                <div className="col-25">
                    <label className="Blabel" htmlFor="reportType">Type: </label>
                    <select id="reportType">
                        <option value="">All</option>
                        <option value="Bug">Bug</option>
                        <option value="Documentation">Documentation</option>
                        <option value="Enhancement">Enhancement</option>
                        <option value="Help">Help</option>
                        <option value="Question">Question</option>
                    </select>
                </div>
                <div className="col-25">
                    <label className="Blabel" htmlFor="reportPriority">Priority: </label>
                    <select id="reportPriority">
                        <option value="">All</option>
                        <option value="Unconfirmed">Unconfirmed</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Immediate">Immediate</option>
                    </select>
                </div>
                <div className="col-25">
                    <label className="Blabel" htmlFor="reportStatus">Status: </label>
                    <select id="reportStatus">
                        <option value="">All</option>
                        <option value="Submitted">New</option>
                        <option value="Open">Open</option>
                        <option value="Active">Active</option>
                        <option value="Resolved">Resolved</option>
                        <option value="wont fix">Wont Fix</option>
                        <option value="Archived">Archived</option>
                    </select>
                </div>
            </div>
            <br />
            <div>
                <table class="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
