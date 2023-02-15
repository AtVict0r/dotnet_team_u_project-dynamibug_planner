import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

/**
 * It returns a Stack component with a Form.Control and a Button component inside of it.
 */
export default function SearchBar() {
  return (
    <Stack
      className="mx-auto"
      direction="horizontal"
      gap={3}
      style={{ width: "80%" }}
    >
      <Form.Control
        className="me-auto"
        placeholder="Search for your bug here..."
      />
      <Button variant="secondary">Submit</Button>
    </Stack>
  );
}
