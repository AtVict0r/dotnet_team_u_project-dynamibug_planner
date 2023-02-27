import "./ContactForm.css";
import React, { useState, useEffect } from "react";
import Captcha from "./CustomCaptcha";

export default function ContactForm({user}) {
    sessionStorage.removeItem('navSearchBar');
    // lazy useState initializer
    const [senderName, setSenderName] = useLocalStorage("senderName", user.name);
    const [senderEmail, setSenderEmail] = useLocalStorage("senderEmail", user.email);
    const [receiverEmail, setReceiverEmail] = useLocalStorage("receiverEmail");
    const [messageTitle, setMessageTitle] = useLocalStorage("messageTitle");
    const [messageBody, setMessageBody] = useLocalStorage("messageBody");

    const handleChange = (tagId) => {
        const list = document.getElementById(tagId).classList;
        if (list.contains("inputWarning")) { list.remove("inputWarning") }
    }

    const handleInvalid = (tagId) => {
        const list = document.getElementById(tagId).classList;
        list.add("inputWarning");
    };

    return (
        <form className="container CFcontainer" onSubmit={(e) => { e.preventDefault(); window.location.href = "/"}}>
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
                    onInvalid={(event) => handleInvalid(event.target.id) }
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
                    onInvalid={(event) => handleInvalid(event.target.id) }
                    type="email"
                    required
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="receiverEmail">
                    Reciever Username:{" "}
                </label>
                <input
                    id="receiverEmail"
                    className="CFinput"
                    value={receiverEmail}
                    onChange={(event) => {
                        setReceiverEmail(event.target.value);
                        handleChange(event.target.id);
                    }}
                    onInvalid={(event) => handleInvalid(event.target.id) }
                    type="text"
                    required
                />
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
                    onInvalid={(event) => handleInvalid(event.target.id) }
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
                    onInvalid={(event) => handleInvalid(event.target.id) }
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

// user defined hooks
function useLocalStorage(key, defaultValue = "") {
    const [state, setState] = useState(() => {
        return window.localStorage.getItem(key) || defaultValue;
    });
    useEffect(() => {
        window.localStorage.setItem(key, state);
    }, [key, state]);
    return [state, setState];
}