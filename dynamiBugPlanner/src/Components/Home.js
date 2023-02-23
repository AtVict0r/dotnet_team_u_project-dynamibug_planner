import SearchBar from "./SearchBar";
import Card from "react-bootstrap/Card";

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

export default function Home() {
  return (
    <div style={{
      marginTop: "15vh",
    }}>
      <SearchBar />
      <div
        style={{
          marginTop: "10vh",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <a className="nav-link" href="/NewReport">
          <NavCard src="https://via.placeholder.com/50" title="Add" />
        </a>
        <a className="nav-link" href="/Browse">
          <NavCard src="https://via.placeholder.com/50" title="Browse" />
        </a>
        <a className="nav-link" href="/Email">
          <NavCard src="https://via.placeholder.com/50" title="Contact" />
        </a>
        <a className="nav-link" href="/Projects">
          <NavCard src="https://via.placeholder.com/50" title="Documentation" />
        </a>
      </div>
    </div>
  );
}
