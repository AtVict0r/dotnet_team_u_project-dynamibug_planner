import { FormControl } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import React, { useState } from "react";

/**
 * It returns a Stack component with a Form.Control and a Button component inside of it.
 */
export default function SearchBar({showSearchBar}) {
  const [navSearchBar, setNavSearchBar] = useState(() => {
    const query = window.location.search.substring(1);
    if(query.includes("Title=")){
      return query.substring(query.indexOf('=')+1);
    }
    return "";
  });

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
      onKeyUp={() => {
        if(navSearchBar === "" && window.location.pathname.includes('Browse')){
          window.location.href = '/Browse';
        }
      }}
      />
      <a className="btn btn-secondary" href={`/Browse?Title=${navSearchBar}`}>Submit</a>
    </Stack>
  );
  }