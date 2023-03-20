import React, { useState, useEffect } from "react";
import Captcha from "../CustomCaptcha";

// window.location.href = '/';

export default function Login({api}) {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const postData = async () => {
        let result = await api.signInUser({
          username: userName,
          password: userPassword,
        });
        result
          .json()
          .then((data) => { sessionStorage.setItem('user', JSON.stringify(data)); window.history.back(); })
          .catch((err) => {
            console.log(err.message);
            document.getElementById("userIsHuman").checked = false;
          });
    }

    return (
        <form className="container CFcontainer" onSubmit={(e) => { e.preventDefault(); postData(); }}>
            <div className="row">
                <label className="CFlabel" htmlFor="userName">
                    UserName:{" "}
                </label>
                <input
                    id="userName"
                    className="CFinput"
                    type="text"
                    onChange={(event) => setUserName(event.target.value)}
                    required
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="userPassword">
                    Password:{" "}
                </label>
                <input
                    id="userPassword"
                    className="CFinput"
                    type="password"
                    onChange={(event) => setUserPassword(event.target.value)}
                    required
                />
            </div>
            <Captcha />
            <div className="row">
                <input className="CFbutton CFinput btn btn-primary" type="submit" value="Login" />
            </div>
        </form>
    );
}