import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from '../../apis/Axios';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    code: '',
    name: ''
  });

  const handleSubmit = () => {
    (async () => {
      const token = localStorage.getItem('token');
      const response = await Axios.post('/courses', courseData, {
        headers: {
          Authorization: token
        }
      })
      if(response.status === 201) {
        // return <Redirect to="/addques" />
        console.log(response.data);
      }
    })();
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