import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    code: '',
    name: ''
  });

  const createRequest = async (payload) => {
    const token = localStorage.getItem('token');
    try {
      const response  = await axios({
        method: 'post',
        url: 'http://localhost:5000/courses',
        data: payload,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
        console.log('Course created successfully')
    }catch(e) {
      console.log(e);
        console.log('in catch');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      const payload = {
        "code": courseData.code,
        "name": courseData.name
      }
      createRequest(payload);
      setCourseData({
        code: '',
        name: ''
      })
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(value)
    setCourseData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
        <label>Course Code</label>
          <input
          type="text"
            placeholder="Code"
            id="code"
            value={courseData.code}
            onChange={handleChange}
          />
        </div>
        <div className="field">
        <label>Course Name</label>
          <input
          type="text"
            placeholder="Course Name"
            id="name"
            value={courseData.name}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className="ui primary button">Create Course</button>
      </form>
    </div>
  )
}

export default CreateCourse;