import React, { useState } from "react";
import RegisterAdmin from "./RegisterAdmin";
import RegisterStudent from "./RegisterStudent";
import UnAuthHeader from "../Headers/UnAuthHeader";
import "./Form.css";

const Signup = () => {
  const [user, setUser] = useState({
    admin: "active",
    student: "",
  });

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
    <div>
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
        {user.admin === "active" ? <RegisterAdmin /> : <RegisterStudent />}
      </div>
    </div>
  );
};

export default Signup;
