import "./ReportDetails.css";
import "../Comments/GetComments.css";
import React, { useEffect, useState } from "react";
import Captcha from "../CustomCaptcha";

function useSessionStorage(key, defaultValue = "") {
  const [state, setState] = useState(() => {
    return JSON.parse(sessionStorage.getItem(key)) || defaultValue;
  });
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default function ReportDetails({api}) {
  sessionStorage.removeItem('navSearchBar');
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
          <DisplayReport id={reportDetailId} api={api} />
        </div>
      );
    }
  }
}

function DisplayReport({ id, api }) {
  const [reportDetail, setReportDetail] = useSessionStorage("reportDetail", {
    id: 0,
    type: "",
    status: "",
    priority: "",
    title: "",
    description: "",
    createDate: "",
    modifiedDate: "",
    project: {id: 0},
    plan: {id: 0},
    comments: []
  });
  const [newComment, setNewComment] = useState("");
  const [addComment, setAddComment] = useState(true);
  const toggleAddComment = () => {
    setAddComment(!addComment);
    handleChange("newComment");
  }

  const postComment = async () => {
    let result = await api.createComment({
      comment: newComment,
      bugId: reportDetail.id,
      createDate: new Date().toISOString(),
    });
    result
      .json()
      .then(window.location.reload())
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getReport(id);
      result
        .json()
        .then((json) => setReportDetail(json))
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, [id, setReportDetail]);

  const deleteReport = async () => {
    let result = await api.deleteReport(id);
    result
      .json()
      .then(window.location.href = "/Browse")
      .catch((err) => console.log(err.message));
  }

  const deleteComment = async (commentId) => {
    let result = await api.deleteComment(commentId);
    result
      .json()
      .then(window.location.reload())
      .catch((err) => console.log(err.message));
  }

  const handleChange = (tagId) => {
    const list = document.getElementById(tagId).classList;
    if (list.contains("inputWarning")) { list.remove("inputWarning") }
  }

  const handleInvalid = (tagId) => {
    const list = document.getElementById(tagId).classList;
    list.add("inputWarning");
  };

  const showComments = (comments) => {
    if (typeof comments !== "undefined") {
      return comments.map((c) => {
        return (
          <div key={c.id} >
            <div className="row Crow">
              <label className="Clabel">Date: </label>{" "}
              <input
                className="Cdate"
                type="text"
                value={new Date(c.createDate)}
                readOnly
              />
            </div>
            <div className="row Crow">
              <label className="Clabel">Comment: </label>{" "}
              <textarea
                className="Ctextarea"
                rows="5"
                value={c.comment}
                readOnly
              />
            </div>
            <button
            style={{marginBottom: "1rem"}}
              onClick={(event) => {
                deleteComment(c.id)
              }}
              className="btn btn-primary"
            >Delete Comment</button>
          </div>
        );
      });
    } else {
      return <p>No Comments</p>;
    }
  };

  if (reportDetail !== "") {
    return (
      <div className="container RDcontainer">
        <a href={`/EditReport?${reportDetail.id}`}>Edit Report</a>
        <div className="row RDrow">
          <label className="RDlabel col-15">Id: </label>{" "}
          <input
            className="RDinput col-25"
            type="number"
            value={reportDetail.id}
            readOnly
          />
          <label className="RDlabel col-15">Type: </label>{" "}
          <input
            className="RDinput col-25"
            type="text"
            value={reportDetail.type}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15">Status: </label>{" "}
          <input
            className="RDinput col-25"
            type="text"
            value={reportDetail.status}
            readOnly
          />
          <label className="RDlabel col-15">Priority: </label>{" "}
          <input
            className="RDinput col-25"
            type="text"
            value={reportDetail.priority}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15">Title: </label>{" "}
          <input
            className="RDinput col-75"
            type="text"
            value={reportDetail.title}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15">Description: </label>{" "}
          <textarea
            rows="10"
            cols="70"
            className="RDinput col-75"
            value={reportDetail.description}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15">Created Date: </label>{" "}
          <input
            className="RDinput col-35"
            type="text"
            value={new Date(reportDetail.createDate)}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15">Modified Date: </label>{" "}
          <input
            className="RDinput col-35"
            type="text"
            value={new Date(reportDetail.modifyDate)}
            readOnly
          />
        </div>
        <a
          href={`/Project?${reportDetail.project.id}`}
          className="btn btn-primary RDbutton"
        >
          Goto Project
        </a>
          <a
            href={`/Plan?${reportDetail.plan.id}`}
            className="btn btn-primary RDbutton"
          >
            Goto Plan
          </a>
        <button
          onClick={deleteReport}
          className="btn btn-primary RDbutton"
        >Delete Report</button>
        <input
          type="button"
          className="btn btn-primary RDbutton"
          onClick={toggleAddComment}
          value="Add Comment"
        />
        <div style={{ marginTop: "1rem", display: (addComment ? "none" : "block"), }}>
          <form onSubmit={(e) => { e.preventDefault(); postComment()}}>
            <div className="row Crow">
              <label className="Clabel">New Comment: </label>{" "}
              <textarea
                className="Ctextarea"
                rows="5"
                id="newComment"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value); 
                  handleChange(event.target.id);
                }}
                onInvalid={(event) => handleInvalid(event.target.id) }
                required
              />
            </div>
            <Captcha />
            <input
              type="submit"
              className="btn btn-primary RDbutton"
              value="Post Comment"
            />
          </form>
        </div>
        <div style={{ marginTop: "1rem", }}>{showComments(reportDetail.comments)}</div>
      </div>
    );
  }
}
