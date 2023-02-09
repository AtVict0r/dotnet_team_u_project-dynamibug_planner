import 'bootstrap/dist/css/bootstrap.min.css';
// import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// function Example()  {
//     return (
//       <div class="alert alert-danger alert-dismissible fade show" role="alert">
//         <strong>Oh snap! You got an error!</strong>
//         <p>
//           Change this and that and try again.
//         </p>
//         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//     )
// }

function BrandLogo() {
    return (
        <Navbar.Brand href="#home">
            <img
              alt=""
              src="./logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            DynamiBug Planner
        </Navbar.Brand>
    );
}

function SearchComponent() {
    return (
      <Stack className="mx-auto" direction="horizontal" gap={3} style={{width: 80 + '%'}}>
        <Form.Control className="me-auto" placeholder="Add your item here..." />
        <Button variant="secondary">Submit</Button>
      </Stack>
    );
}

function UserLogin() {
    const User = {
        'IsSignedIn': true,
        'Name': "John Doe",
    }

    let content;

    if(User.IsSignedIn){ 
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

    return(
        content
        // To=Do: Add Profile Image
    );
}

function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <BrandLogo />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* <Nav className="me-auto"> */}
                        <SearchComponent />
                        <UserLogin />
                    {/* </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
  
// export default Example;
export default NavBar;