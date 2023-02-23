import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { BugPlannerApi } from "../../API/apiClient/BugPlannerApi";
import React, { useEffect, useState } from "react";

const api = new BugPlannerApi({ baseUrl: "https://localhost:7227" });

function ProjectCards({ id, name, description }) {
  return (
    <Card style={{ width: "10rem", margin: "1rem" }}>
      <Card.Img variant="top" src="https://via.placeholder.com/1" />
      <Card.Body>
        <a href={`/Project?${id}`}>
          <Card.Title>{name}</Card.Title>
        </a>
        {description !== null ? <Card.Text>{description}</Card.Text> : <></>}
      </Card.Body>
    </Card>
  );
}

function ListProjects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getProjects();
      result.json().then((json) => {
        setProjects(json);
      });
    };
    fetchData();
  }, []);

  if (projects !== null) {
    return projects.map((project) => {
      return (
        <ProjectCards
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
        />
      );
    });
  }
}

export default function AdminProjects() {
  return (
    <div className="container">
      <h1>Projects</h1>
      <a href="NewProject" className="btn btn-primary">Add Project</a>
      <Row>
        <ListProjects />
      </Row>
    </div>
  );
}
