import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BugPlannerApi } from "./API/apiClient/BugPlannerApi";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/AdminPage/SideBar";
import Home from "./Components/Home";
import AddReport from "./Components/BugReports/AddReport";
import Browse from "./Components/BugReports/Browse";
import Report from "./Components/BugReports/ReportDetails";
import UpdateReport from "./Components/BugReports/UpdateReport";
import AddProject from "./Components/AdminPage/Projects/AddProject";
import Projects from "./Components/AdminPage/Projects/AdminProjects";
import Project from "./Components/AdminPage/Projects/ProjectDetail";
import UpdateProject from "./Components/AdminPage/Projects/UpdateProject";
import Plan from "./Components/AdminPage/PlanFix";
import Contact from "./Components/ContactForm";
import NoPage from "./Components/NoPage";
import Footer from "./Components/Footer";

let user = {
  role: "admin",
  username: "Admin",
  email: "admin@example.com",
  isSignedIn: true,
  name: "John Doe",
};
const api = new BugPlannerApi({ baseUrl: "https://localhost:7227" });

export default function Page() {
  return (
    <BrowserRouter>
      {user.role === "admin" ? <SideBar /> : <></>}
      <Routes>
        <Route path="/" element={<NavBar user={user} />}>
          <Route index element={<Home />} />
          <Route path="/NewReport" element={<AddReport api={api} user={user} />} />
          <Route path="/Browse" element={<Browse api={api} />} />
          <Route path="/Report" element={<Report api={api} user={user} />} />
          <Route path="/EditReport" element={<UpdateReport api={api} />} />
          <Route path="/NewProject" element={<AddProject api={api} user={user} />} />
          <Route path="/Projects" element={<Projects api={api} />} />
          <Route path="/Project" element={<Project api={api} />} />
          <Route path="/EditProject" element={<UpdateProject api={api} />} />
          <Route path="/Plan" element={<Plan api={api} />} />
          <Route path="/Email" element={<Contact api={api} user={user} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
