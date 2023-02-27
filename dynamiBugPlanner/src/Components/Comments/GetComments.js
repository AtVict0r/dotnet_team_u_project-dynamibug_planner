import React, { useState } from "react";

export default function GetComments({ api, comments }) {
    const [userComment, setUserComment] = useState({
        createDate: new Date(),
        comment: "",
        user: {userName: ""},
    });

    const fetchData = async (id) => {
        let result = await api.getComment(id);
        result
            .json()
            .then((json) => setUserComment(json))
            .catch((err) => console.log(err.message));
    };

    const deleteComment = async (commentId) => {
        let result = await api.deleteComment(commentId);
        result
            .json()
            .then(window.location.reload())
            .catch((err) => console.log(err.message));
    }

    if (typeof comments !== "undefined") {
        return comments.map((c) => {
            fetchData(c.id);
            return (
                <div key={c.id} >
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
}