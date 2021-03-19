import React, { useEffect, useState } from "react";
import axios from 'axios';
import AdminHeader from "../Headers/AdminHeader";

const Admin = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:5000/admin/me",
          headers: { Authorization: `Bearer ${token}` }
        })

        console.log(response.data);
        setData(response.data.email);
      } catch (e) {
        console.log('Admin profile page error: ', e);
      }
    })();
  }, []);

  return (
    <div>
      <AdminHeader/>
      <div className="ui items">{data}</div>
      <button className="ui teal button">Edit Profile</button>
    </div>
  );
};

export default Admin;
