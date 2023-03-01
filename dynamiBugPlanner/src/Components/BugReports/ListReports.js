import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";

function ListReport({ report }) {
  const date = new Date(report.modifyDate);
  return (
    <tr>
      <td>
        <a href={`/Project?${report.project.id}`}>{report.project.name}</a>
      </td>
      <td>
        <a href={`/Report?${report.id}`}>{report.title}</a>
      </td>
      <td>{report.type}</td>
      <td>{report.status}</td>
      <td>{report.priority}</td>
      <td>{date.toLocaleString()}</td>
    </tr>
  );
}
export default function ListReports({ reports }) {
  const [startLength, setStartLength] = useState(0);
  let reportsTable = reports
    .sort((a, b) => {
      return a.title.localeCompare(b.title);
    })
    .slice(
      startLength,
      reports.length > startLength + 10 ? startLength + 10 : reports.length
    )
    .map((report) => {
      return <ListReport key={report.id} report={report} />;
    });

    useEffect(() => {
      if(reports.length < startLength){
        setStartLength(0);
      }
      const nextButton = document.getElementById("reportsNextButton");
      const previousButton = document.getElementById("reportsPreviousButton");
      if (previousButton != null && nextButton != null) {
        nextButton.disabled = startLength + 10 >= reports.length;
        previousButton.disabled = startLength === 0;
      }
    }, [startLength, reports]);

  const handleButtonClick = (event) => {
    if (
      event.target.id === "reportsNextButton" &&
      startLength + 10 < reports.length
    ) {
      setStartLength(startLength + 10);
    } else if (event.target.id === "reportsPreviousButton" && startLength > 0) {
      setStartLength(startLength - 10);
    }
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Report Title</th>
            <th>Report Type</th>
            <th>Report Status</th>
            <th>Report Priority</th>
            <th>Report Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{reportsTable}</tbody>
      </Table>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <input
          id="reportsPreviousButton"
          type="button"
          value="Previous"
          onClick={handleButtonClick}
        />
        <input
          id="reportsNextButton"
          type="button"
          value="Next"
          style={{ width: "75px" }}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}