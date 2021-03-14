import React, { useState } from 'react';
import './Form.css';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    user: 'Administrator'
  })
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const payload = {
        "email": user.email,
        "password": user.password
      }
     try { 
      const response = await axios({
        method: "post",
        url: "http:localhost:5000/admin/login",
        data: payload
      })
        setUser(prevState => ({
          ...prevState,
          'successMessage': 'Registration successful. Redirecting to home.'
        }))
        console.log(response.data.token);
        localStorage.setItem('isSignedIn', true);
        localStorage.setItem('token', response.data.token);
        console.log('user logged in successfully')
     } catch (e) {
        console.log('Login failed:', e)
      }
    })()
  };

  return (
    <div>
      <div className="main-form">
      <h2 style={{'textAlign': 'center'}}>Login</h2>
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
        <div className="field">
            <label>Login As:</label>
            <div className="ui floating dropdown labeled search icon button">
            <i className="user icon"></i>
            <span className="text">Select</span>
              <select className="menu" name="type" id={user.user} onChange={handleChange}>
                  <option className="item" value="Student">Student</option>
                  <option className="item" value="Admin">Administrator</option>
              </select>
            </div>
        </div>
        <button
          className="ui button primary"
          onClick={handleSubmit}
          style={{ 'marginTop': "10px" }}
        >
          Login
        </button>
      </form>
    </div>
    </div>
  );
}

export default Login;