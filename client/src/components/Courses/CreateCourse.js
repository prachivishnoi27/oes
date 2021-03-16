import React, { useState } from "react";
import axios from "axios";
import Header from "../Headers/Header";

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    code: "",
    name: "",
    p_marks: "",
    n_marks: "",
    time: "",
  });

  const createRequest = async (payload) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/courses",
        data: payload,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      console.log("Course created successfully");
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
      marking: {
        positive: courseData.p_marks,
        negative: courseData.n_marks
      },
      time: courseData.time
    };
    createRequest(payload);
    setCourseData({
      code: "",
      name: "",
      p_marks: "",
      n_marks: "",
      time: ""
    });
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
    <div>
      <Header auth="admin"/>
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
          <label>Marking</label>
          <div>
            {" "}
            Positive:
            <input
              type="text"
              placeholder="+1"
              id="p_marks"
              value={courseData.p_marks}
              onChange={handleChange}
            />
          </div>
          <div>
            {" "}
            Negative:
            <input
              type="text"
              placeholder="-1"
              id="n_marks"
              value={courseData.n_marks}
              onChange={handleChange}
            />
          </div>
        </div>
        <button onClick={handleSubmit} className="ui primary button">
          Create examination
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
