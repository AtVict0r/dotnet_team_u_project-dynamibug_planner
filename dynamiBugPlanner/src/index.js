import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BugPlannerApi } from "./API/apiClient/BugPlannerApi";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/AdminPage/SideBar";
import Home from "./Components/Home";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import Profile from "./Components/Users/Profile";
import UpdateUser from "./Components/Users/UpdateUser";
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

export default function Page() {
  const [api] = useState(new BugPlannerApi({ baseUrl: "https://localhost:7227" }));
  const [user, setUser] = useState(null);
  const [savedUser] = useState(JSON.parse(window.sessionStorage.getItem('user')));
  const [expired, setExpired] = useState((savedUser != null)? new Date() > new Date(window.atob(savedUser.expiration)) : null);

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getCurrentUser();
      result
        .json()
        .then((json) => {
          setUser(json.user);
          setExpired(new Date() > new Date(json.user.expiration));
          window.sessionStorage.setItem('user', JSON.stringify({token: window.btoa(json.token), expiration: window.btoa(json.user.expiration)}));
        })
        .catch((err) => console.log(err.message));
    };

    if (savedUser !== "null" && savedUser !== null) {
      // console.log("Is Expired?", (new Date() > new Date(window.atob(savedUser.expiration))));
      // console.log("Current time:", new Date());
      // console.log("Expiration time:", new Date(window.atob(savedUser.expiration)));
      // console.log("Expired?", expired);
      setExpired(new Date() > new Date(window.atob(savedUser.expiration)));

      if(expired){  
        window.sessionStorage.removeItem('user');
      }
      else if (!expired) {  
        api.baseApiParams.headers = { authorization: `bearer ${window.atob(savedUser.token)}` };
        fetchData();
      }
    };
  }, [api, savedUser])

  return (
    <BrowserRouter>
      {((user!= null) && (user.role === "admin" || user.role === "manager"))? <SideBar /> : <></>}
      <Routes>
        <Route path="/" element={<NavBar api={api} user={user} />}>
          <Route index element={<Home />} />
          <Route path="/Login" element={<Login api={api} user={user} invalidToken={expired} />} />
          <Route path="/Register" element={<Register api={api} />} />
          <Route path="/Profile" element={<Profile api={api} user={user} invalidToken={expired} />} />
          <Route path="/EditProfile" element={<UpdateUser api={api} user={user} invalidToken={expired} />} />
          <Route path="/NewReport" element={<AddReport api={api} userId={(user!= null)? user.id : null} invalidToken={expired} />} />
          <Route path="/Browse" element={<Browse api={api} />} />
          <Route path="/Report" element={<Report api={api} userId={(user!= null)? user.id : 0} userRole={(user != null)? user.role : ""} />} />
          <Route path="/EditReport" element={<UpdateReport api={api} invalidToken={expired} />} />
          <Route path="/NewProject" element={<AddProject api={api} userId={(user!= null)? user.id : null} invalidToken={expired} />} />
          <Route path="/Projects" element={<Projects api={api} userRole={(user != null)? user.role : ""} />} />
          <Route path="/Project" element={<Project api={api} userId={(user!= null)? user.id : 0} userRole={(user != null)? user.role : ""} />} />
          <Route path="/EditProject" element={<UpdateProject api={api} invalidToken={expired} />} />
          <Route path="/Plan" element={<Plan api={api} userId={(user!= null)? user.id : 0} userRole={(user != null)? user.role : null} />} />
          <Route path="/Email" element={<Contact api={api} userName={(user!= null)? user.fullName : ""} userEmail={(user != null)? user.email : ""}/>} />
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