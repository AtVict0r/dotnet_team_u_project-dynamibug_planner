import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import Test from './Components/NavBar';
=======
import NavBar from './Components/NavBar';
>>>>>>> master
import SideBar from './Components/SideBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    {/* <App /> */}
        <Test />
        <div>
            <SideBar />
        </div>
=======
    <NavBar />
    <SideBar />
>>>>>>> master
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();