import React, { useState } from 'react';
import Axios from '../../apis/Axios';
import Header from '../Header';

const LoginAdmin = () => {
  const [admin, setAdmin] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(value)
    setAdmin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(admin);
    (async () => {
      const payload = {
        "email": admin.email,
        "password": admin.password
      }
      const response = await Axios.post('/admin/login', payload);
      if(response.status === 200) {
        setAdmin(prevState => ({
          ...prevState,
          'successMessage': 'Registration successful. Redirecting to home.'
        }))
        console.log(response.data.token);
        localStorage.setItem('isSignedIn', true);
        localStorage.setItem('token', response.data.token);
        console.log('user logged in successfully')
      }else {
        console.log('Login failed')
      }
    })()
  };

  return (
    <div>
      <Header />
      <div className="main-form">
      <h2>Administrator Login</h2>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="abc@xyz.com"
            id="email"
            value={admin.email}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={admin.password}
            onChange={handleChange}
          />
        </div>
        <button
          className="ui button primary"
          onClick={handleSubmit}
          style={{ marginTop: "10px" }}
        >
          Login
        </button>
      </form>
    </div>
    </div>
  );
}

export default LoginAdmin;