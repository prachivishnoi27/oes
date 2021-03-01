import React, { useEffect, useState } from "react";
import Axios from "../../apis/Axios";

const Admin = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => {
      const response = await Axios.get("/users/me", {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setData(response.data.name);
      }
    })();
  }, []);

  return (
    <div>
      Hi i am admin
      <div className="ui items">My name is {data}</div>
      <button className="ui teal button">Edit Profile</button>
    </div>
  );
};

export default Admin;
