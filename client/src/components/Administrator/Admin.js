import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from '../Headers/Header';

const Admin = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:5000/admin/me"
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
      <Header auth="admin"/>
      <div className="ui items">{data}</div>
      <button className="ui teal button">Edit Profile</button>
    </div>
  );
};

export default Admin;
