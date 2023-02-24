import { FormControl } from "react-bootstrap";
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

/**
 * It returns a Stack component with a Form.Control and a Button component inside of it.
 */
export default function SearchBar({showSearchBar}) {
  const [navSearchBar, setNavSearchBar] = useSessionStorage("navSearchBar");

  return (
    <Stack
      className="mx-auto"
      direction="horizontal"
      gap={3}
      style={{ width: "80%", visibility: (showSearchBar)? "hidden" : "visible"}}
    >
      <FormControl
      id = "navSearchBar"
        className="me-auto"
        placeholder="Search for your bug here..."
        value={navSearchBar}
        onChange={(event) => {
          setNavSearchBar(event.target.value);
      }}
      onKeyUp={(event) => {
        if(navSearchBar === ""){
          window.location.reload();
        }
      }}
      />
      <a className="btn btn-secondary" href={`/Browse?${navSearchBar}`}>Submit</a>
    </Stack>
  );
  }