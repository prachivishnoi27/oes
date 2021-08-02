import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import AdminHeader from "../Headers/AdminHeader";

const Admin = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "get",
          url: `${baseUrl}/admin/me`,
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (e) {
        console.log("Admin profile page error: ", e);
      }
    })();
  }, []);

  return (
    <div className="admin">
      <div className="ui container">
      <AdminHeader />
      {/* <button className="ui teal button">Edit Profile</button> */}
      
      </div>
      <div className="main">
      <div className="ui raised card">
        <div className="content">
          <div className="center aligned header">{data.name}</div>
          <div className="center aligned description">
            <p>
              Email: {data.email}
            </p>
            <p>
              Administrator
            </p>
          </div>
        </div>
        <div className="extra content">
          <div className="center aligned author">
            <img
              className="ui avatar image"
              src="https://semantic-ui.com/images/avatar/small/jenny.jpg"
            />{" "}
            {data.name}
          </div>
        </div>  
      </div>
    </div>
    </div>
  );
};

export default Admin;
