import React, { useState, useEffect } from "react";

export default function Profile({ api, user, invalidToken }) {
    const [id, setId] = useState(0);
    const [fullname, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (window.sessionStorage.getItem('user') == null || invalidToken) {
            window.location.href = '/login';
        }

        if (user !== null) {
            setId(user.id);
            setFullName(user.fullName);
            setUsername(user.userName);
            setEmail(user.email);
            setRole(user.role)
        }
    }, [user, invalidToken])

    const deleteCurrentUser = async () => {
        let result = await api.deleteUser(id);
        result
            .json()
            .then(window.location.reload())
            .catch((err) => console.log(err.message));
    };

    return (
        <div className="container">
            <h1>User Account</h1>
            <a
                className="btn btn-primary"
                href='/EditProfile'
            >
                Edit User
            </a>
            <div className="row" style={{ marginTop: "1rem" }}>
                <label className="CFlabel" htmlFor="fullname">
                    Full Name:{" "}
                </label>
                <input
                    id="fullname"
                    className="CFinput"
                    value={fullname}
                    type="text"
                    readOnly
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="username">
                    User Name:{" "}
                </label>
                <input
                    id="username"
                    className="CFinput"
                    value={username}
                    type="text"
                    readOnly
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="email">
                    Email:{" "}
                </label>
                <input
                    id="email"
                    className="CFinput"
                    value={email}
                    type="email"
                    readOnly
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="role">
                    Role:{" "}
                </label>
                <input
                    id="role"
                    className="CFinput"
                    value={role.toUpperCase()}
                    type="text"
                    readOnly
                />
            </div>
            <input
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    if (window.confirm("Are you sure you want to delete this user?") === true)
                        deleteCurrentUser();
                }}
                value="Delete User"
            />
        </div>
    );
}