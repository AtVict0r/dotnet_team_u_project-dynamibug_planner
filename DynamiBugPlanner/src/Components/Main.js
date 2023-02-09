import Button from 'react-bootstrap/Button';
import { Outlet, Link } from "react-router-dom";
import SideBar from './Components/SideBar';

function Card(pageName, pageAddress) {
  return (
    <Link to={pageAddress}>
      <Button variant="secondary" width="18rem" height="18rem" value={pageName} />
    </Link>
  );
}

function UserHome() {
  return (
    <div>
      <Card pageName="Add" pageAddress="./AddIssue" />
      <Card pageName="Browse" pageAddress="./BrowseIssue" />
      <Card pageName="Documentation" pageAddress="./#" />
      <Card pageName="Contact" pageAddress="./EmailAdmin" />
      <Outlet />
    </div>
  );
}

function AdminHome(){
  return(
    <aside>
      <SideBar />
    </aside>  
  );
}

function Main() {
  return (
    <UserHome />
  );
}

export default Main;