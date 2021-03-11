import React, { useEffect, useState } from "react";
import Axios from "../../apis/Axios";
import Header from '../Header';

const Admin = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => {
      const response = await Axios.get("/admin/me", {
        headers: {
          Authorization: token
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setData(response.data.email);
      }
    })();
  }, []);

  return (
    <div>
      <Header />
      <div className="ui items">{data}</div>
      <button className="ui teal button">Edit Profile</button>
    </div>
  );
};

export default Admin;
