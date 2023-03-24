import React, { useState } from "react";
import Captcha from "../CustomCaptcha";

export default function Register({ api }) {
  const [userName, setUserName] = useState("");
  const [userPassword1, setUserPassword1] = useState("");
  const [userPassword2, setUserPassword2] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const postData = async () => {
    let result = await api.createUser({
      username: userName,
      password: userPassword2,
      firstname: userFirstName,
      lastname: userLastName,
      email: userEmail,
    });
    result
      .json()
      .then((data) => {
        sessionStorage.setItem("user", JSON.stringify({token: window.btoa(data.token), expiration: window.btoa(data.expiration)}));
        window.history.back();
      })
      .catch((err) => {
        console.log(err.message);
        document.getElementById("userIsHuman").checked = false;
      });
  };

  const handleChange = (tagId) => {
    const list = document.getElementById(tagId).classList;
    if (list.contains("inputWarning")) {
      list.remove("inputWarning");
    }
  };

  const handleInvalid = (tagId) => {
    const list = document.getElementById(tagId).classList;
    list.add("inputWarning");
  };

  const comparePasswords = (tagId) => {
    let warning = document.getElementById(tagId + "Warning");

    if (userPassword1 !== userPassword2) {
      handleInvalid(tagId);
      warning.hidden = false;
    } else {
      warning.hidden = true;
    }
  };

  return (
    <div className="container">
      <h1>Create New Account</h1>
      <form
        className="container CFcontainer"
        onSubmit={(e) => {
          e.preventDefault();
          postData();
        }}
      >
        <div className="row">
          <label className="CFlabel" htmlFor="userFirstName">
            FirstName:{" "}
          </label>
          <input
            id="userFirstName"
            className="CFinput"
            type="text"
            onChange={(event) => {
              setUserFirstName(event.target.value);
              handleChange(event.target.id);
            }}
            onInvalid={(event) => handleInvalid(event.target.id)}
            required
          />
        </div>
        <div className="row">
          <label className="CFlabel" htmlFor="userLastName">
            LastName:{" "}
          </label>
          <input
            id="userLastName"
            className="CFinput"
            type="text"
            onChange={(event) => {
              setUserLastName(event.target.value);
              handleChange(event.target.id);
            }}
            onInvalid={(event) => handleInvalid(event.target.id)}
            required
          />
        </div>
        <div className="row">
          <label className="CFlabel" htmlFor="userName">
            UserName:{" "}
          </label>
          <input
            id="userName"
            className="CFinput"
            type="text"
            onChange={(event) => {
              setUserName(event.target.value);
              handleChange(event.target.id);
            }}
            onInvalid={(event) => handleInvalid(event.target.id)}
            required
          />
        </div>
        <div className="row">
          <label className="CFlabel" htmlFor="userEmail">
            Email:{" "}
          </label>
          <input
            id="userEmail"
            className="CFinput"
            type="email"
            onChange={(event) => {
              setUserEmail(event.target.value);
              handleChange(event.target.id);
            }}
            onInvalid={(event) => handleInvalid(event.target.id)}
            required
          />
        </div>
        <div className="row">
          <label className="CFlabel" htmlFor="userPassword1">
            Password:{" "}
          </label>
          <input
            id="userPassword1"
            className="CFinput"
            type="password"
            onChange={(event) => {
              setUserPassword1(event.target.value);
              handleChange(event.target.id);
            }}
            onInvalid={(event) => handleInvalid(event.target.id)}
            required
          />
        </div>
        <div className="row">
          <label className="CFlabel" htmlFor="userPassword2">
            Repeat Password:{" "}
          </label>
          <input
            id="userPassword2"
            className="CFinput"
            type="password"
            onChange={(event) => {
              setUserPassword2(event.target.value);
              handleChange(event.target.id);
            }}
            onInvalid={(event) => handleInvalid(event.target.id)}
            onBlur={(event) => comparePasswords(event.target.id)}
            required
          />
          <span id="userPassword2Warning" hidden>
            Password doesn't match
          </span>
        </div>
        <Captcha />
        <div className="row">
          <input
            className="CFbutton CFinput btn btn-primary"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
}
