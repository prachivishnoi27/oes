import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const StudentHeader = () => {
  const [isSignedInStudent, setIsSignedInStudent] = useState(
    localStorage.getItem("isSignedInStudent")
  );
 
  if (isSignedInStudent === false) {
    return <Redirect to="/"></Redirect>;
  }

  const Logout = () => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        await axios({
          method: "post",
          url: "http://localhost:5000/student/logout",
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("token");
          localStorage.setItem("isSignedInStudent", false);
          console.log("Student logged out successfully");
          setIsSignedInStudent(false);
      } catch (e) {
        console.log('Can\'t logout');
      }
    })();
  };
  return (
    <div className="ui secondary menu">
      <Link to="/allexams" className="item">All Exams</Link>
      <div className="right menu">
        <Link to="/student" className="item">My profile</Link>
        {/* <Link to="/myresults" className="item">Results</Link> */}
      <div onClick={Logout} className="item" style={{ cursor: "pointer" }}>
          Logout
        </div>
      </div>
    </div>
  )
}

export default StudentHeader;