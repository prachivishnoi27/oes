import "./Signup.css";
import React, { useState } from "react";
import  { Redirect } from 'react-router-dom';
import Axios from '../../apis/Axios';

const Signup = () => {
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    name: "",
    password: ""
  });

  let redirect = 0;

  const sendInfoToServer = async () => {
    console.log(newAdmin);
    const payload = {
      "name": newAdmin.name,
      "email": newAdmin.email,
      "password": newAdmin.password
    }
    const response = await Axios.post('/users', payload);
    if(response.status === 201) {
      setNewAdmin(prevState => ({
        ...prevState,
        'successMessage': 'Registration successful. Redirecting to home.'
      }))
      console.log(response.data.token);
      localStorage.setItem('isSignedIn', true);
      localStorage.setItem('token', response.data.token);
      console.log('user created successfully')
      redirect=1;
    }else {
      console.log('Administrator can\'t be created.')
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(value)
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
    <div className="main-form">
      <h2>Create account as Administrator</h2>
      <form onSubmit={handleSubmit} className="ui form error">
        <div className="field">
          <label>Name</label>
          <input
          type="text"
            placeholder="Name"
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
          Create Account
        </button>
      </form>
      {redirect === 1? <Redirect to="/admin" />: ''}
    </div>
  );
};

export default Signup;
