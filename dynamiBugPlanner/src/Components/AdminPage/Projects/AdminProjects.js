import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";

function ProjectCards({ id, name, description }) {
  return (
    <Card style={{ width: "10rem", margin: "1rem" }}>
      <Card.Img variant="top" src="https://via.placeholder.com/1" />
      <Card.Body>
        <a href={`/Project?${id}`}>
          <Card.Title>{name}</Card.Title>
        </a>
        {description !== null ? 
          <Card.Text>
            {(description.length > 50)? description.substring(0, 50) + "..." : description}
          </Card.Text> 
          : 
          <></>
        }
      </Card.Body>
    </Card>
  );
}

function ListProjects({api}) {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getUnArchivedProjects();
      result.json().then((json) => {
        setProjects(json);
      });
    };
    fetchData();
  }, [api]);

  if (projects !== null) {
    return projects.sort((a, b) => {return a.name.localeCompare(b.name)}).map((project) => {
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

export default function AdminProjects({api, userRole}) {
  return (
    <div className="container">
      <h1>Projects</h1>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <a href="/Browse">Go to Reports</a>
        {(userRole !== "admin" && userRole !== "manager")? <></> : <a href="NewProject" className="btn btn-primary">Add Project</a>}
      </div>
      <Row>
        <ListProjects api={api} />
      </Row>
    </div>
  );
}
