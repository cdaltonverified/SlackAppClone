import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./components/Auth/Login/Login.component";
import Register from "./components/Auth/Register/Register.component"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/" element={<App/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
