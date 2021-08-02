import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import React, { useEffect, useState } from "react";
import StudentHeader from "../Headers/StudentHeader";

const Student = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios({
          method: "get",
          url: `${baseUrl}/student/me`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setProfile(response.data);
      } catch (e) {
        console.log("error in catch");
      }
    })();
  }, []);

  return (
    <div className="student">
      <div className="ui container">
        <StudentHeader />
        <div className="main">
          <div className="ui raised card">
            <div className="content">
              <div className="center aligned header">{profile.name}</div>
              <div className="center aligned description">
                <p>Email: {profile.email}</p>
                <p>Roll No: {profile.rollno}</p>
                {profile.collage !== undefined ? (
                  <p>Collage Name: {profile.collage}</p>
                ) : (
                  <p>School Name: {profile.school}</p>
                )}
                <p>Contact: {profile.contact}</p>
                <p>Student</p>
              </div>
            </div>
            <div className="extra content">
              <div className="center aligned author">
                <img
                  className="ui avatar image"
                  src="https://semantic-ui.com/images/avatar/small/jenny.jpg"
                />{" "}
                {profile.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
