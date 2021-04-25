import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import RegisterAdmin from "./RegisterAdmin";
import RegisterStudent from "./RegisterStudent";
import UnAuthHeader from "../Headers/UnAuthHeader";
import "./Form.css";
import '../Home.css';

const Signup = () => {
  const [admin, setAdmin] = useState(false);
  const [student, setStudent] = useState(false);
  const [user, setUser] = useState({
    admin: "active",
    student: "",
  });

  if (admin === true) {
    return <Redirect to="/admin" />;
  }

  if(student === true){
    return <Redirect to="/allexams"/>;
  }

  const handleAdmin = (ok) => {
    if(ok === true) {
      setAdmin(true);
    }
  }

  const handleStudent = (ok) => {
    if(ok === true) {
      setStudent(true);
    }
  }

  const handleClick = (e) => {
    const { id } = e.target;
    const _user = { admin: "", student: "" };
    if (id === "admin") {
      _user.admin = "active";
    } else {
      _user.student = "active";
    }
    setUser(_user);
  };

  return (
    <div className="home">
      <div className="ui container">
      <UnAuthHeader />
      <div className="main-form">
        <div className="ui secondary menu">
          <div
            onClick={handleClick}
            id="admin"
            className={`${user.admin} item`}
          >
            Administrator
          </div>
          <div
            onClick={handleClick}
            className={`${user.student} item`}
            id="student"
          >
            Student
          </div>
        </div>
        {user.admin === "active" ? <RegisterAdmin register={handleAdmin}/> : <RegisterStudent register={handleStudent} />}
      </div>
      </div>
    </div>
  );
};

export default Signup;
