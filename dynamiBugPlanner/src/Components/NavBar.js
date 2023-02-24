import { Outlet, Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "./SearchBar";

/**
 * It returns a Navbar.Brand component with an image and text.
 */
function BrandLogo() {
  return (
    <Link className="nav-link" to="/">
      <Navbar.Brand>
        <img
          alt="brand logo"
          src="https://via.placeholder.com/50"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        DynamiBug Planner
      </Navbar.Brand>
    </Link>
  );
}

/**
 * If the user is not signed in, display the login and register links, otherwise display the user's name
 * and logout links.
 */
function UserLogin({user}) {
  if (user.isSignedIn) {
    return (
      <Nav className="me-auto">
        <Nav.Link href="/Profile">{user.username}</Nav.Link>
        <Nav.Link href="/Logout">Logout</Nav.Link>
      </Nav>
    );
    
  } else {
    return (
      <Nav className="ms-auto">
        <Nav.Link href="/Login">Login</Nav.Link>
        <Nav.Link href="/Register">Register</Nav.Link>
      </Nav>
    );
  }
  
  // To=Do: Add Profile Image
}

/**
 * A Navbar component with a container component inside of it. The container component has a
 * BrandLogo component, a Navbar.Toggle component, and a Navbar.Collapse component inside of it. The
 * Navbar.Collapse component has a SearchComponent component and a UserLogin component inside of it.
 */
export default function NavBar({user}) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <BrandLogo />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBar showSearchBar={(useLocation().pathname == "/")}/>
            <UserLogin user={user}/>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
