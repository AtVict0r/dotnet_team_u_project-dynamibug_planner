import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Browse from './Components/BugReports/Browse';


let user = {
  role: "admin",
}

export default function Page({pageType = 'home'}) {
  let content = <Home user={user}/>;

  if (pageType === 'browse') {
    content = <Browse />;
  }

  return (
    <React.StrictMode>
      <NavBar />
      {content}
      <Footer />
    </React.StrictMode>      
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Page />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();