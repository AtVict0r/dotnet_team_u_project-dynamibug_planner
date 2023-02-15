import React, { useState, useEffect } from "react";

export default function ContactForm() {
  // lazy useState initializer
  const [senderName, setSenderName] = useLocalStorage("senderName");
  const [senderEmail, setSenderEmail] = useLocalStorage("senderEmail");
  const [receiverEmail, setReceiverEmail] = useLocalStorage("receiverEmail");
  const [messageTitle, setMessageTitle] = useLocalStorage("messageTitle");
  const [messageBody, setMessageBody] = useLocalStorage("messageBody");

  return (
    <div style={{}}>
      <form>
        <div>
          <label htmlFor="senderName">Name: </label>
          <input
            id="senderName"
            value={senderName}
            onChange={(event) => {
              setSenderName(event.target.value);
            }}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="senderEmail">Email: </label>
          <input
            id="senderEmail"
            value={senderEmail}
            onChange={(event) => {
              setSenderEmail(event.target.value);
            }}
            type="email"
          />
        </div>
        <div>
          <label htmlFor="receiverEmail">Reciever: </label>
          <input
            id="receiverEmail"
            value={receiverEmail}
            onChange={(event) => {
              setReceiverEmail(event.target.value);
            }}
            type="email"
          />
        </div>
        <div>
          <label htmlFor="messageTitle">Title: </label>
          <input
            id="messageTitle"
            value={messageTitle}
            onChange={(event) => {
              setMessageTitle(event.target.value);
            }}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="messageBody">Message: </label>
          <textarea
            id="messageBody"
            value={messageBody}
            onChange={(event) => {
              setMessageBody(event.target.value);
            }}
          />
        </div>		
		<div>
        <input type="checkbox" id="userIsHumman" value="I am not a robot." />
        <label htmlFor="userIsHuman">I am not a robot</label>
      </div>
      <button type="button" className="btn btn-primary">Send</button>
      </form>
    </div>
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
