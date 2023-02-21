import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import React, { useEffect, useState } from "react";

function useSessionStorage(key, defaultValue = "") {
  const [state, setState] = useState(() => {
      return window.sessionStorage.getItem(key) || defaultValue;
  });
  useEffect(() => {
      window.sessionStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}

function resetFilter() {
  sessionStorage.setItem("projectName", "");
  sessionStorage.setItem("reportType", "");
  sessionStorage.setItem("reportStatus", "");
  sessionStorage.setItem("reportPriority", "");
}

/**
 * It returns a Stack component with a Form.Control and a Button component inside of it.
 */
export default function SearchBar() {
  const [navSearchBar, setNavSearchBar] = useSessionStorage("navSearchBar");

  return (
    <Stack
      className="mx-auto"
      direction="horizontal"
      gap={3}
      style={{ width: "80%" }}
    >
      <Form.Control
      id = "navSearchBar"
        className="me-auto"
        placeholder="Search for your bug here..."
        value={navSearchBar}
        onChange={(event) => {
          setNavSearchBar(event.target.value);
      }}
      />
      <a className="nav-link" href="/Browse">
      <Button variant="secondary" onClick={resetFilter}>Submit</Button>
      </a>
    </Stack>
  );
  }