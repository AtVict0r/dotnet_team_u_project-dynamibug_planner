import React from "react";
// import Sidebar from "react-sidebar";

export default function SideBar() {
  const listItem = {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "10vh",
    fontSize: "24px",
  };
  return (
    <>
      <button
        style={{ position: "absolute", zIndex: "6" }}
        onClick={() => this.onSetSidebarOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

      <div
        style={{
          backgroundColor: "red",
          display: "flex",
          width: "20vw",
          height: "90.7%",
          zIndex: "5",
          position: "absolute",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ul className="list-unstyled list">
          <li style={listItem}>
            <a className="nav-link" href="#dashboard">
              <b>Dashboard</b>
            </a>
          </li>
          <li style={listItem}>
            <a className="nav-link" href="#plan">
              Plan
            </a>
          </li>
          <li style={listItem}>
            <a className="nav-link" href="#archive">
              Archive
            </a>
          </li>
          <li style={listItem}>
            <a className="nav-link" href="#users">
              Users
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

// class SideBar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             sidebarOpen: true
//         };
//         this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
//     }

//     onSetSidebarOpen(open) {
//         this.setState({ sidebarOpen: open });
//     }

//     listItem = { display: "flex", justifyContent: "center", paddingBottom: "10vh", fontSize: "24px" };

//     SidebarContent() {
//         return (
//             <div  style={{ padding: "50px" }}>
//                 <ul className="list-unstyled list">
//                     <li style={this.listItem}>
//                         <a className="nav-link" href="#dashboard"><b>Dashboard</b></a>
//                     </li>
//                     <li style={this.listItem}>
//                         <a className="nav-link" href="#plan">Plan</a>
//                     </li>
//                     <li style={this.listItem}>
//                         <a className="nav-link" href="#archive">Archive</a>
//                     </li>
//                     <li style={this.listItem}>
//                         <a className="nav-link" href="#users">Users</a>
//                     </li>
//                 </ul>
//             </div>
//         );
//     }

//     render() {
//         return (
//             <Sidebar
//                 sidebar={this.SidebarContent()}
//                 open={this.state.sidebarOpen}
//                 onSetOpen={this.onSetSidebarOpen}
//                 styles={{ sidebar: { background: "white", marginTop: "5%" } }}
//             >
//                 <button style={{marginTop: "5%"}} onClick={() => this.onSetSidebarOpen(true)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
//                         <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
//                     </svg>
//                 </button>
//             </Sidebar>
//         );
//     }
// }
