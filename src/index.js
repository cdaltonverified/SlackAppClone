import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import Login from "./components/Auth/Login/Login.component";
import Register from "./components/Auth/Register/Register.component"
import firebase from "./server/firebase";

// Redux
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { combinedReducers } from "./storage/reducer";
import { setUser } from "./storage/actioncreator"


const storage = createStore(combinedReducers);

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    return (
      <Component
        history={history}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

const Index = (props) => {
  const history = useNavigate();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        props.setUser(user);
        history("/");
      }
      else{
        props.setUser(null);
        history("/login");
      }
    })
  },[]);

  return ( 
    <Routes>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/" element={<App/>}/>
    </Routes>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    }
  }
}

const IndexWithRouter = withRouter(connect(mapStateToProps, matchDispatchToProps)(Index));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storage}>
      <Router>
        <IndexWithRouter/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
