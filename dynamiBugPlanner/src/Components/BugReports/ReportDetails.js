import './ReportDetails.css';
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
    });

    if (typeof report !== 'undefined' && report !== null) {
        return (
            <div className="container RDcontainer">
                <a href={`/EditReport?${report.id}`}>Edit Report</a>
                <div className="row RDrow">
                    <label className="RDlabel col-15">Id: </label>{" "}
                    <input className="RDinput col-25" type="number" value={report.id} readOnly />
                    <label className="RDlabel col-15">Type: </label>{" "}
                    <input className="RDinput col-25" type="text" value={report.type} readOnly />
                </div>
                <div className="row">
                    <label className="RDlabel col-15">Status: </label>{" "}
                    <input className="RDinput col-25" type="text" value={report.status} readOnly />
                    <label className="RDlabel col-15">Priority: </label>{" "}
                    <input className="RDinput col-25" type="text" value={report.priority} readOnly />
                </div>
                <div className="row">
                    <label className="RDlabel col-15">Title: </label>{" "}
                    <input className="RDinput col-75" type="text" value={report.title} readOnly />
                </div>
                <div className="row">
                    <label className="RDlabel col-15">Description: </label>{" "}
                    <textarea rows="10" cols="70" className="RDinput col-75" value={report.description} readOnly />
                </div>
                <div className="row">
                    <label className="RDlabel col-15">Created Date: </label>{" "}
                    <input className="RDinput col-35" type="text" value={new Date(report.createDate)} readOnly />
                </div>
                <div className="row">
                    <label className="RDlabel col-15">Modified Date: </label>{" "}
                    <input className="RDinput col-35" type="text" value={new Date(report.modifyDate)} readOnly />
                </div>
                <a href={`/Project?${report.project.id}`} className="btn btn-primary RDbutton">Goto Project</a>
                {(report.plan !== null)? <a href={`/Plan?${report.plan.id}`} className="btn btn-primary RDbutton">Goto Plan</a> : <></>}
                <input type="button" className="btn btn-primary RDbutton" onClick={showAddComment} value="Add Comment" />
                <ListComments comments={report.comments} />
            </div>
        );
    }
}