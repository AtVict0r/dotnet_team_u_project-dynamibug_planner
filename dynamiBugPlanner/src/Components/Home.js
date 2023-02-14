import SideBar from "./AdminPage/SideBar";
import SearchBar from "./SearchBar";
import Card from "react-bootstrap/Card";
import AddReports from "./BugReports/AddReport";

function NavCard({ src, title }) {
  return (
    <Card
      style={{
        width: "15vw",
        alignItems: "center",
      }}
    >
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

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
        <NavCard src="https://via.placeholder.com/50" title="Add" />
        <NavCard src="https://via.placeholder.com/50" title="Browse" />
        <NavCard src="https://via.placeholder.com/50" title="Documentation" />
        <NavCard src="https://via.placeholder.com/50" title="Contact" />
      </div>
    </div>
  );
}

function AdminHome() {
  return <SideBar />;
}

export default function Home({user}) {
  let content;
  if (user.role == "admin") {content = <AdminHome />;}
  return (
    <>
      {content}
      <UserHome />
    </>
  );
}
