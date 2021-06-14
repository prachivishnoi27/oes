import React, { useState } from "react";
import axios from "axios";
import AdminHeader from "../Headers/AdminHeader";
import { Redirect } from "react-router";

const CreateExam = () => {
  const [courseData, setCourseData] = useState({
    code: "",
    name: "",
    time: "",
    level: ""
  });

  const [created, setCreated] = useState(false);

  if(created === true) {
    return <Redirect to={`/course/${courseData.code}`} />;
  }

  const createRequest = async (payload) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/courses",
        data: payload,
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response);
      console.log("Course created successfully");
      setCreated(true);
    } catch (e) {
      console.log(e);
      console.log("in catch");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      code: courseData.code,
      name: courseData.name,
      time: courseData.time,
      level: courseData.level
    };
    createRequest(payload);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    // console.log(value);
    setCourseData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="admin">
      <div className="ui container">
      <AdminHeader/>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label>Exam Code</label>
          <input
            type="text"
            placeholder="Code"
            id="code"
            value={courseData.code}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Exam Name</label>
          <input
            type="text"
            placeholder="Course Name"
            id="name"
            value={courseData.name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Time (in minutes)</label>
          <input
            type="text"
            placeholder="60"
            id="time"
            value={courseData.time}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Level: </label>
          <input
            type="text"
            placeholder="Beginner"
            id="level"
            value={courseData.level}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className="ui primary button">
          Create Exam
        </button>
      </form>

      </div>
    </div>
  );
};

export default CreateExam;
