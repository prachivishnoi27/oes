import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const AdminHeader = () => {
  const [isSignedInAdmin, setIsSignedInAdmin] = useState(
    localStorage.getItem("isSignedInAdmin")
  );

  if (isSignedInAdmin === false) {
    return <Redirect to="/"></Redirect>;
  }

  const Logout = () => {
    (async () => {
      const token = localStorage.getItem("token");
      // console.log(token);
      try {
        await axios({
          method: "post",
          url: "http://localhost:5000/admin/logout",
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("token");
          localStorage.setItem("isSignedInAdmin", false);
          console.log("Admin logged out successfully");
          setIsSignedInAdmin(false);
      } catch (e) {
        console.log('Can\'t logout');
      }
    })();
  };

  return (
    <div className="ui menu">
      <Link className="item" to="/courses">
        My Exams
      </Link>
      <div className="right menu">
        <Link className="item" to="/admin">
          My Profile
        </Link>
        <div onClick={Logout} className="item" style={{ cursor: "pointer" }}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
