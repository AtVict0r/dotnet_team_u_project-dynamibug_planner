import React, { useState, useEffect } from "react";
import Captcha from "../CustomCaptcha";

export default function UpdateUser({api, user, invalidToken}) {
    const [id, setId] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (window.sessionStorage.getItem('user') == null || invalidToken) {
            window.location.href = '/login';
        }

        if (user !== null) {
            setId(user.id);
            setFirstname(user.firstName);
            setLastname(user.lastName);
            setEmail(user.email);
        }
    }, [user, invalidToken])

    const postData = async () => {
        let result = await api.updateUser(id, {
          firstName: firstname,
          lastName: lastname,
          email: email
        });
        result
          .json()
          .then(window.history.back())
          .catch((err) => {
            console.log(err.message);
            document.getElementById("userIsHuman").checked = false;
          });
    }

    const handleChange = (tagId) => {
        const list = document.getElementById(tagId).classList;
        if (list.contains("inputWarning")) { list.remove("inputWarning") }
      }
    
      const handleInvalid = (tagId) => {
        const list = document.getElementById(tagId).classList;
        list.add("inputWarning");
      };

    return (
        <div className="container">
            <h1>Edit User</h1>
            <form className="container CFcontainer" onSubmit={(e) => { e.preventDefault(); postData(); }}>
            <div className="row">
                <label className="CFlabel" htmlFor="firstname">
                    First Name:{" "}
                </label>
                <input
                    id="firstname"
                    className="CFinput"
                    type="text"
                    value={firstname}
                    onChange={(event) => {
                        setFirstname(event.target.value)
                        handleChange(event.target.id);
                      }}
                    onInvalid={(event) => { handleInvalid(event.target.id) }}
                    required
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="lastname">
                    Last Name:{" "}
                </label>
                <input
                    id="lastname"
                    className="CFinput"
                    type="text"
                    value={lastname}
                    onChange={(event) => {
                        setLastname(event.target.value)
                        handleChange(event.target.id);
                      }}
                    onInvalid={(event) => { handleInvalid(event.target.id) }}
                    required
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="email">
                    Email:{" "}
                </label>
                <input
                    id="email"
                    className="CFinput"
                    type="text"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                        handleChange(event.target.id);
                      }}
                    onInvalid={(event) => { handleInvalid(event.target.id) }}
                    required
                />
            </div>
            <Captcha />
            <div className="row">
                <input className="CFbutton CFinput btn btn-primary" type="submit" value="Update" />
            </div>
        </form>
        </div>
    );
}