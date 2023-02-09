import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import React from "react";
import Sidebar from "react-sidebar";

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    listItem = { display: "flex", justifyContent: "center", paddingBottom: "14px", fontSize: "24px" };

    SidebarContent() {
        return (
            //style="font-size: 20px; display: flex; justify-content: center; padding-bottom: 10px"
            <div  style={{ padding: "50px" }}>
                <ul className="list-unstyled list">
                    <li style={this.listItem}>
                        <a className="nav-link" href="#dashboard"><b>Dashboard</b></a>
                    </li>
                    <li style={this.listItem}>
                        <a className="nav-link" href="#plan">Plan</a>
                    </li>
                    <li style={this.listItem}>
                        <a className="nav-link" href="#archive">Archive</a>
                    </li>
                    <li style={this.listItem}>
                        <a className="nav-link" href="#users">Users</a>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        return (
            <Sidebar
                sidebar={this.SidebarContent()}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
            >
                <button style={{}} onClick={() => this.onSetSidebarOpen(true)}>
                    Open sidebar
                </button>
            </Sidebar>
        );
    }
}

export default SideBar;



//function OffcanvasExample() {
//  return (
//    <>
//      {
//        <Navbar key={false} bg="light" expand={false} className="mb-3">
//          <Container fluid>
//            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
//            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
//            <Navbar.Offcanvas
//              id={`offcanvasNavbar-expand-false`}
//              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
//              placement="end"
//            >
//              <Offcanvas.Header closeButton>
//                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
//                  Offcanvas
//                </Offcanvas.Title>
//              </Offcanvas.Header>
//              <Offcanvas.Body>
//                <Nav className="justify-content-end flex-grow-1 pe-3">
//                  <Nav.Link href="#action1">Home</Nav.Link>
//                  <Nav.Link href="#action2">Link</Nav.Link>
//                  <NavDropdown
//                    title="Dropdown"
//                    id={`offcanvasNavbarDropdown-expand-false`}
//                  >
//                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                    <NavDropdown.Item href="#action4">
//                      Another action
//                    </NavDropdown.Item>
//                    <NavDropdown.Divider />
//                    <NavDropdown.Item href="#action5">
//                      Something else here
//                    </NavDropdown.Item>
//                  </NavDropdown>
//                </Nav>
//                <Form className="d-flex">
//                  <Form.Control
//                    type="search"
//                    placeholder="Search"
//                    className="me-2"
//                    aria-label="Search"
//                  />
//                  <Button variant="outline-success">Search</Button>
//                </Form>
//              </Offcanvas.Body>
//            </Navbar.Offcanvas>
//          </Container>
//        </Navbar>
//      }
//    </>
//  );
//}

//export default OffcanvasExample;