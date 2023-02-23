import "./ContactForm.css";
import React, { useState, useEffect } from "react";

export default function ContactForm() {
    // lazy useState initializer
    const [senderName, setSenderName] = useLocalStorage("senderName");
    const [senderEmail, setSenderEmail] = useLocalStorage("senderEmail");
    const [receiverEmail, setReceiverEmail] = useLocalStorage("receiverEmail");
    const [messageTitle, setMessageTitle] = useLocalStorage("messageTitle");
    const [messageBody, setMessageBody] = useLocalStorage("messageBody");

    return (
        <form className="container CFcontainer">
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
                    }}
                    type="text"
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
                    }}
                    type="email"
                />
            </div>
            <div className="row">
                <label className="CFlabel" htmlFor="receiverEmail">
                    Reciever:{" "}
                </label>
                <input
                    id="receiverEmail"
                    className="CFinput"
                    value={receiverEmail}
                    onChange={(event) => {
                        setReceiverEmail(event.target.value);
                    }}
                    type="email"
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
                    }}
                    type="text"
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
                    }}
                />
            </div>
            <br />
            <div className="row">
                <label className="CFlabel" htmlFor="userIsHuman">
                    I am not a robot
                </label>
                <input
                    className="CFcheckbox"
                    type="checkbox"
                    id="userIsHumman"
                    value="I am not a robot."
                />
                <button className="CFbutton CFinput btn btn-primary" type="button">
                    Send
                </button>
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