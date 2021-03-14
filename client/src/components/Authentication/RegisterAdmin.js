import "./Form.css";
import React, { useState } from "react";
import axios from 'axios';

const RegisterAdmin = () => {
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    name: "",
    password: ""
  });

  const sendInfoToServer = async () => {
    console.log(newAdmin);
    const payload = {
      "name": newAdmin.name,
      "email": newAdmin.email,
      "password": newAdmin.password
    }
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/admin",
        data: payload
      })
      setNewAdmin(prevState => ({
        ...prevState,
        'successMessage': 'Registration successful. Redirecting to home.'
      }))
      console.log(response.data.token);
      localStorage.setItem('isSignedIn', true);
      localStorage.setItem('token', response.data.token);
      console.log('Admin created successfully')
    } catch (e) {
      console.log('Administrator can\'t be created. error: ', e)
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    // console.log(value)
    setNewAdmin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendInfoToServer();
  };

  return (
    <div>
      <React.Fragment>
      <h3>Register as Administrator</h3>
      <form onSubmit={handleSubmit} className="ui form">
      <div className="field">
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            id="name"
            value={newAdmin.name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="abc@xyz.com"
            id="email"
            value={newAdmin.email}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={newAdmin.password}
            onChange={handleChange}
          />
        </div>
        <button
          className="ui button primary"
          onClick={handleSubmit}
          style={{ marginTop: "10px" }}
        >
          Register
        </button>
      </form>
    </React.Fragment>
    </div>
  );
};

export default RegisterAdmin;
