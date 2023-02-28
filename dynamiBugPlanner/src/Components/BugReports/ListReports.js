import Table from "react-bootstrap/Table";

function ListReport({ report }) {
  const date = new Date(report.modifyDate);
  return (
    <tr key={report.id}>
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
    let reportsTable = reports
    .sort((a, b) => {
      return a.title.localeCompare(b.title);
    })
    .map((report) => {
      return <ListReport report={report}/>;
    });

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
          <tbody>
            {reportsTable}
          </tbody>
        </Table>
      </div>
  )
}
