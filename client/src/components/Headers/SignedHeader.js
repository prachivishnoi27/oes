import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
// import Axios from '../apis/Axios';
import axios from "axios";

const SignedHeader = () => {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("isSignedIn")
  );


  if (isSignedIn === false) {
    return <Redirect to="/"></Redirect>;
  }

  const Logout = () => {
    (async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      // const response = await Axios.post('/admin/logout',{
      //   "Authorization": `Bearer ${token}`
      // })
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/admin/logout",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.status);
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.setItem("isSignedIn", false);
        setIsSignedIn(false);
        console.log(response);
        console.log("Admin logged out successfully");
      }
    })();
  };

  return (
    <div className="right menu">
      <Link className="item" to="/admin">
        My Profile
      </Link>
      <Link className="item" to="/courses">
        My Courses
      </Link>
      <div onClick={Logout} className="item" style={{ cursor: "pointer" }}>
        Logout
      </div>
    </div>
  );
};

export default SignedHeader;
