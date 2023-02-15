import React, { useState } from "react";

export default function SideBar() {
  const listItem = {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "10vh",
    fontSize: "24px",
  };

  const [state, setState] = useState(true);
  const toggle = () => { setState(!state); }

  return (
    <>
      <button style={{ position: "absolute", zIndex: "6" }} onClick={toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          width: "20vw",
          height: "100%",
          zIndex: "5",
          position: "absolute",
          justifyContent: "center",
          flexDirection: "column",
          visibility: (state? "hidden" : "visible"),
        }}
      >
        <ul className="list-unstyled list">
          <li style={listItem}>
            <a className="nav-link" href="/">
              <b>Dashboard</b>
            </a>
          </li>
          <li style={listItem}>
            <a className="nav-link" href="Plan">
              Plan
            </a>
          </li>
          <li style={listItem}>
            <a className="nav-link" href="/Archive">
              Archive
            </a>
          </li>
          <li style={listItem}>
            <a className="nav-link" href="/Users">
              Users
            </a>
          </li>
          <li style={listItem}>
            <a className="nav-link" href="/Github">
              Github
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}