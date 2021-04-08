import React from "react";
import UnAuthHeader from "./Headers/UnAuthHeader";

const Home = () => {
  console.log(localStorage.getItem("isSignedInStudent"), "std");
  console.log(localStorage.getItem("isSignedInAdmin"), "admin");

  return (
    <div>
      <UnAuthHeader />
      <div className="top-center">
        <h1>Online Examination system</h1>
      </div>
      <div className="ui divider"></div>
      <div style={{ background: "white", padding: "10px", fontSize: "16px" }}>
        <p>
          In this system students are asked to select answers from multiple
          options given for a single question. Likewise, there are several
          questions which appear in the students' systems. The questions and
          multiple options are saved in a database along with desired answers.
          Typically, a student can edit an answer after saving it, however
          editing cannot be done after submitting the answer. Another user is
          also there - administrator. The administrator can create, modify and
          delete questions and accordingly, the question is updated in the
          system.
        </p>
      </div>
      <div
        className="ui borderless inverted menu"
        style={{
          flexShrink: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: 'white',
          width: "83vw",
          height: "10vh",
          marginTop: "10px",
          bottom: "0px",
          position: "absolute",
        }}
      >
        <div>Made by Prachi Vishnoi</div>
      </div>
    </div>
  );
};

export default Home;
