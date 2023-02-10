import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "./SearchBar";
/**
 * It returns a Navbar.Brand component with an image and text.
 */
function BrandLogo() {
  return (
    <Navbar.Brand href="#home">
      <img
        alt="brand logo"
        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{" "}
      DynamiBug Planner
    </Navbar.Brand>
  );
}

/**
 * If the user is not signed in, display the login and register links, otherwise display the user's name
 * and logout links.
 */
function UserLogin() {
  const User = {
    IsSignedIn: true,
    Name: "John Doe",
  };

  let content;

  if (User.IsSignedIn) {
    content = (
      <Nav className="ms-auto">
        <Nav.Link href="#home">Login</Nav.Link>
        <Nav.Link href="#features">Register</Nav.Link>
      </Nav>
    );
  } else {
    content = (
      <Nav className="me-auto">
        <Nav.Link href="#home">{User.Name}</Nav.Link>
        <Nav.Link href="#features">Logout</Nav.Link>
      </Nav>
    );
  }

  return content;
  // To=Do: Add Profile Image
}

/**
 * A Navbar component with a container component inside of it. The container component has a
 * BrandLogo component, a Navbar.Toggle component, and a Navbar.Collapse component inside of it. The
 * Navbar.Collapse component has a SearchComponent component and a UserLogin component inside of it.
 */
function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <BrandLogo />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBar />
          <UserLogin />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// export default Example;
export default NavBar;
