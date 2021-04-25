import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";
import UnAuthHeader from '../Headers/UnAuthHeader';
import "./Form.css";
import '../Home.css';

import axios from "axios";

const Login = () => {
  const [log, setLog] = useState('');
  const [user, setUser] = useState({
    email: "",
    password: "",
    user: "Admin",
  });

  useEffect( () => {}, [log]);
  if(log === 'Student'){
    return <Redirect to="/student" />
  }

  if(log === 'Admin'){
    return <Redirect to="/admin" />
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    console.log(id, value);
  };

  const options = [
    { value: "Admin", label: "Administrator" },
    { value: "Student", label: "Student" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.user === 'Admin') {
      (async () => {
        const payload = {
          email: user.email,
          password: user.password,
        };
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:5000/admin/login",
            data: payload,
          });
          setUser((prevState) => ({
            ...prevState,
            successMessage: "Registration successful. Redirecting to home.",
          }));
          console.log(response.data.token);
          localStorage.setItem("isSignedInAdmin", true);
          localStorage.setItem("token", response.data.token);
          console.log("admin logged in successfully");
          setLog('Admin')
        } catch (e) {
          console.log("Login failed:", e);
        }
      })();
    }else {
      (async () => {
        const payload = {
          email: user.email,
          password: user.password,
        };
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:5000/student/login",
            data: payload,
          });
          setUser((prevState) => ({
            ...prevState,
            successMessage: "Registration successful. Redirecting to home.",
          }));
          console.log(response.data.token);
          localStorage.setItem("isSignedInStudent", true);
          localStorage.setItem("token", response.data.token);
          console.log("student logged in successfully");
          setLog('Student')
        } catch (e) {
          console.log("Login failed:", e);
        }
      })();
    }
    
  };

  return (
    <div className="home">
      <div className="ui container">
      <UnAuthHeader />
      <div className="main-form">
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit} className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="abc@xyz.com"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="ui form field">
            <label>Login As:</label>
              <Select options={options} onChange={(e) => {
                console.log(e.value);
                setUser((prevState) => ({
                  ...prevState,
                  user: e.value,
                }));
              }}/>
          </div>
          <button
            className="ui button brown"
            onClick={handleSubmit}
            style={{ 'marginTop': '10px', 'marginBottom': '10px' }}
          >
            Login
          </button>
        </form>
        <Link to="/signup" style={{'color': 'rgb(189, 129, 95)'}}>Dont have an account? Signup</Link>
      </div>
      </div>
    </div>
  );
};

export default Login;