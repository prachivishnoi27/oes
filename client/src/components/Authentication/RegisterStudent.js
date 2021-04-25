import "./Form.css";
import React, { useState } from "react";
import axios from 'axios';

const RegisterStudent = ({ register }) => {
  const [newStudent, setNewStudent] = useState({
    email: "",
    rollno: "",
    name: "",
    password: "",
    contact: "",
    school: "",
    collage: ""
  });

  const sendInfoToServer = async () => {
    // console.log(newStudent);
    const payload = {
      "name": newStudent.name,
      "email": newStudent.email,
      "password": newStudent.password,
      "collage": newStudent.collage,
      "school": newStudent.school,
      "rollno": newStudent.rollno,
      "contact": newStudent.contact
    }
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/student",
        data: payload
      })
      setNewStudent(prevState => ({
        ...prevState,
        'successMessage': 'Registration successful. Redirecting to home.'
      }))
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isSignedInStudent', true);
      console.log('Student created successfully')
      register(true);
    } catch (e) {
      console.log('Student can\'t be created. error: ', e)
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(value)
    setNewStudent((prevState) => ({
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
      <h3>Register as Student</h3>
      <form onSubmit={handleSubmit} className="ui form">
      <div className="field">
          <label>Roll No:</label>
          <input
            type="text"
            id="rollno"
            value={newStudent.rollno}
            onChange={handleChange}
          />
        </div>
      <div className="field">
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            id="name"
            value={newStudent.name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="abc@xyz.com"
            id="email"
            value={newStudent.email}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={newStudent.password}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Contact</label>
          <input
            type="text"
            id="contact"
            value={newStudent.contact}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>School</label>
          <input
            type="text"
            id="school"
            value={newStudent.school}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Collage</label>
          <input
            type="text"
            id="collage"
            value={newStudent.collage}
            onChange={handleChange}
          />
        </div>
        <button
          className="ui button brown"
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

export default RegisterStudent;
