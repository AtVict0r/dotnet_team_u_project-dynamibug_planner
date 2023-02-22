import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/AdminPage/SideBar";
import Home from "./Components/Home";
import Browse from "./Components/BugReports/Browse";
import Add from "./Components/BugReports/AddReport";
import Contact from "./Components/ContactForm";
import NoPage from "./Components/NoPage";
import Projects from "./Components/AdminPage/AdminProjects";
import Report from "./Components/BugReports/ReportDetails";
import Plan from "./Components/AdminPage/PlanFix";
import Archive from "./Components/AdminPage/ArchivedReports";
import Users from "./Components/AdminPage/ListUsers";
import Github from "./Components/AdminPage/GithubProjects";
import Footer from "./Components/Footer";

let user = {
  role: "admin",
};

export default function Page() {
  return (
    <BrowserRouter>
      {user.role === "admin" ? <SideBar /> : <></>}
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/Add" element={<Add />} />
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Email" element={<Contact />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Plan" element={<Plan />} />
          <Route path="/Archive" element={<Archive />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Github" element={<Github />} />
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
