import "./ContactForm.css";
import React, { useState, useEffect } from "react";
import Captcha from "./CustomCaptcha";

export default function ContactForm({ api, userName, userEmail }) {
    const [senderName, setSenderName] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [receiverUsername, setReceiverUsername] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const [adminUsernames, setAdminUsernames] = useState([]);

    useEffect(() => {
        setSenderName(userName);
        setSenderEmail(userEmail);

        const fetchData = async () => {
            let result = await api.getAdminsUsername();
            result
                .json()
                .then((json) => setAdminUsernames(json))
                .catch((err) => console.log(err.message));
        };
        fetchData();
    }, [api, userName, userEmail])

    const postData = async () => {
        let result = await api.postEmail({
            senderName: senderName,
            senderEmail: senderEmail,
            adminUserName: receiverUsername,
            messageTitle: messageTitle,
            messageBody: messageBody
        });
        result
            .json()
            .catch((err) => {
                console.log(err.message)
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

    const listAdminUsernames = () => {
        let count = 0;
        return adminUsernames.map((admin) => {
            count += 1;
            return (
                <option key={count} value={admin.userName}>
                    {admin.fullName}
                </option>
            );
        });
    }

    return (
        <form className="container CFcontainer" onSubmit={(e) => { e.preventDefault(); postData(); window.location.href = '/'}}>
            <div className="row">
                <label className="CFlabel" htmlFor="senderName">
                    Name:{" "}
                </label>
                <input
                    id="senderName"
                    className="CFinput"
                    value={senderName}
                    onChange={(event) => {
                        setSenderName(event.target.value);
                        handleChange(event.target.id);
                    }}
                    onInvalid={(event) => handleInvalid(event.target.id)}
                    type="text"
                    required
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="senderEmail">
                    Email:{" "}
                </label>
                <input
                    id="senderEmail"
                    className="CFinput"
                    value={senderEmail}
                    onChange={(event) => {
                        setSenderEmail(event.target.value);
                        handleChange(event.target.id);
                    }}
                    onInvalid={(event) => handleInvalid(event.target.id)}
                    type="email"
                    required
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="receiverUsername">
                    Recipient:{" "}
                </label>
                <select
                    id="receiverUsername"
                    className="CFinput"
                    value={receiverUsername}
                    onChange={(event) => {
                        setReceiverUsername(event.target.value);
                        handleChange(event.target.id);
                    }}
                    onInvalid={(event) => { handleInvalid(event.target.id) }}
                    required
                >
                    <option value=""></option>
                    {listAdminUsernames()}
                </select>
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="messageTitle">
                    Title:{" "}
                </label>
                <input
                    id="messageTitle"
                    className="CFinput"
                    value={messageTitle}
                    onChange={(event) => {
                        setMessageTitle(event.target.value);
                        handleChange(event.target.id);
                    }}
                    onInvalid={(event) => handleInvalid(event.target.id)}
                    type="text"
                    required
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="messageBody">
                    Message:{" "}
                </label>
                <textarea
                    id="messageBody"
                    className="CFinput"
                    rows="5"
                    cols="50"
                    value={messageBody}
                    onChange={(event) => {
                        setMessageBody(event.target.value);
                        handleChange(event.target.id);
                    }}
                    onInvalid={(event) => handleInvalid(event.target.id)}
                    required
                />
            </div>
            <Captcha />
            <div className="row">
                <input className="CFbutton CFinput btn btn-primary" type="submit" value="Send" />
            </div>
        </form>
    );
}