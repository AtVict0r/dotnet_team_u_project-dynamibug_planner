import React, { useEffect, useState } from "react";
import { BugPlannerApi } from "../../API/apiClient/BugPlannerApi";
import ListComments from "../Comments/GetComments";

const api = new BugPlannerApi({ baseUrl: "https://localhost:7227" });

export default function ReportDetails() {
    let reportDetailId = window.location.search;
    if (reportDetailId === null || reportDetailId === "") {
        window.location.href = "/Browse";
    } else {
        reportDetailId = Number(reportDetailId.substring(1));
        if (isNaN(reportDetailId)) {
            window.location.href = "/Browse";
        } else {
            return (
                <div className="container">
                    <h3>Report Detail</h3>
                    <a href="/Browse">Back to list</a>
                    <DisplayReport id={reportDetailId} />
                </div>
            );
        }
    }
}

function showAddComment() {
    console.log("Hello");
}

function DisplayReport({ id }) {
    const [report, setReport] = useState();
    useEffect(() => {
        const fetchData = async () => {
            let result = await api.getReport(id);
            result
                .json()
                .then((json) => setReport(json))
                .catch((err) => console.log(err.message));
        };
        fetchData();
    }, []);

    if (typeof report !== 'undefined' && report !== null) {
        return (
            <div>
                <a href={`/EditReport?${report.id}`}>Edit Report</a>
                <div>
                    <label>Id: </label>{" "}
                    <input type="number" value={report.id} readOnly />
                </div>
                <div>
                    <label>Type: </label>{" "}
                    <input type="text" value={report.type} readOnly />
                </div>
                <div>
                    <label>Status: </label>{" "}
                    <input type="text" value={report.status} readOnly />
                </div>
                <div>
                    <label>Priority: </label>{" "}
                    <input type="text" value={report.priority} readOnly />
                </div>
                <div>
                    <label>Title: </label>{" "}
                    <input type="text" value={report.title} readOnly />
                </div>
                <div>
                    <label>Description: </label>{" "}
                    <textarea value={report.description} readOnly />
                </div>
                <div>
                    <label>Created Date: </label>{" "}
                    <input type="text" value={new Date(report.createDate)} readOnly />
                </div>
                <div>
                    <label>Modified Date: </label>{" "}
                    <input type="text" value={new Date(report.modifyDate)} readOnly />
                </div>
                <a href={`/Project?${report.project.id}`}>Goto Project</a>
                {(report.plan !== null)? <a href={`/Plan?${report.plan.id}`}>Goto Plan</a> : <></>}
                <input type="button" className="btn btn-primary" onClick={showAddComment} value="Add Comment" />
                <ListComments comments={report.comments} />
            </div>
        );
    }
}