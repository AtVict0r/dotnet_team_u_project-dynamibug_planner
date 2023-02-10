import SideBar from "./AdminPage/SideBar";
import SearchBar from "./SearchBar";
import Card from "react-bootstrap/Card";

function UserHome() {
  return (
    <div>
      <div
      style={{
        marginTop: "15vh", 
      }}
      >
        <SearchBar />
      </div>
      <div
        style={{
          marginTop: "10vh",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <Card style={{
          width: "15vw",
          alignItems: "center",
        }}>
          <Card.Img variant="top" src="https://via.placeholder.com/50" />
          <Card.Body>
            <Card.Title>Add</Card.Title>
          </Card.Body>
        </Card>
        <Card style={{
          width: "15vw",
          alignItems: "center",
        }}>
          <Card.Img variant="top" src="https://via.placeholder.com/50" />
          <Card.Body>
            <Card.Title>Browse</Card.Title>
          </Card.Body>
        </Card>
        <Card style={{
          width: "15vw",
          alignItems: "center",
        }}>
          <Card.Img variant="top" src="https://via.placeholder.com/50" />
          <Card.Body>
            <Card.Title>Documentation</Card.Title>
          </Card.Body>
        </Card>
        <Card style={{
          width: "15vw",
          alignItems: "center",
        }}>
          <Card.Img variant="top" src="https://via.placeholder.com/50" />
          <Card.Body>
            <Card.Title>Contact</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

function AdminHome() {
  return <SideBar />;
}

function Main() {
  return (
    <div>
      <UserHome />
      <AdminHome />
    </div>
  );
}

export default Main;
