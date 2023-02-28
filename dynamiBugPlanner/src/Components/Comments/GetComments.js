import React, { useState, useEffect } from "react";
import "../Comments/GetComments.css";

export default function GetComments({ api, reportId }) {
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getReportComments(reportId);
      result
        .json()
        .then((json) => setUserComments(json))
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, [reportId]);

  const deleteComment = async (commentId) => {
    let result = await api.deleteComment(commentId);
    result
      .json()
      .then(window.location.reload())
      .catch((err) => console.log(err.message));
  };

  if (userComments.length > 0) {
    return userComments.map((userComment) => {
      return (
        <div key={userComment.id}>
          <div className="row Crow">
            <label className="Clabel">Date: </label>{" "}
            <input
              className="Cdate"
              type="text"
              value={new Date(userComment.createDate)}
              readOnly
            />
          </div>
          <div className="row Crow">
            <label className="Clabel">Username: </label>{" "}
            <input
              className="Cdate"
              type="text"
              value={userComment.user.userName}
              readOnly
            />
          </div>
          <div className="row Crow">
            <label className="Clabel">Comment: </label>{" "}
            <textarea
              className="Ctextarea"
              rows="5"
              value={userComment.comment}
              readOnly
            />
          </div>
          <button
            style={{ marginBottom: "1rem" }}
            onClick={(event) => {
              deleteComment(userComment.id);
            }}
            className="btn btn-primary"
          >
            Delete Comment
          </button>
        </div>
      );
    });
  } else {
    return <p>No Comments</p>;
  }
}
