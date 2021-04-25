import React from "react";
import "./Home.css";
import GithubSVG from "../img/github.svg";
import LinkedinSVG from "../img/linkedin.svg";
import { Link } from "react-router-dom";

const Home = () => {
  console.log(localStorage.getItem("isSignedInStudent"), "std");
  console.log(localStorage.getItem("isSignedInAdmin"), "admin");

  return (
    <div className="home">
      <div className="ui container ">
        <div className="top-center">
          <p style={{ color: "#A96846" }}>Online Examination System</p>
        </div>
        <div className="ui divider"></div>
        <div className="main">
            <div className="about">
              <p>
                In this system students are asked to select answers from
                multiple options given for a single question. Likewise, there
                are several questions which appear in the students' systems. The
                questions and multiple options are saved in a database along
                with desired answers. Typically, a student can edit an answer
                after saving it, however editing cannot be done after submitting
                the answer. Another user is also there - administrator. The
                administrator can create, modify and delete questions and
                accordingly, the question is updated in the system.
              </p>
            <Link className="ui button brown" to="/login">
              Login
            </Link>
            <div style={{padding: '10px'}}>OR</div>
            <Link className="ui button brown" to="/signup">
              Signup
            </Link>
            </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "83vw",
            height: "10vh",
            marginTop: "10px",
            bottom: "0px",
            position: "absolute",
            flexDirection: 'column'
          }}
        >
          <div style={{ textAlign: "center" }}>Made by Prachi Vishnoi</div>
          <div>
          <a href="https://www.github.com/prachivishnoi27" target="_blank">
            <img style={{ height: "30px", margin: '5px'}} src={GithubSVG} alt="Github Logo" />
          </a>
          <a href="https://www.linkedin.com/in/prachivishnoi27" target="_blank">
            <img
              style={{ height: "30px", margin: '5px'}}
              src={LinkedinSVG}
              alt="Github Logo"
            />
          </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
