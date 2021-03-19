import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminHeader from "../Headers/AdminHeader";
import axios from "axios";

const SingleCourse = () => {
  const { code } = useParams();
  const [name, setName] = useState("");
  const [ques, setQues] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/courses/${code}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name);
        setQues(response.data.questions);
      } catch (e) {
        console.log(e, "in catch");
      }
    })();
  }, [code]);

  const renderList = () => {
    return ques.map( (question) => {
      return (
        <div className="item" key={question._id}>
          <div className="header">{question.ques}</div>
          <div className="bulleted">
            <div className="list">
              <div className="item">{question.options[0].a}</div>
              <div className="item">{question.options[1].b}</div>
              <div className="item">{question.options[2].c}</div>
              <div className="item">{question.options[3].d}</div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div>
      <AdminHeader/>
      <h2>Course Code: {code}</h2>
      <h2 >Course Name: {name}</h2>
      <h3>Questions</h3>
      <div className="ui list">
        {renderList()}
      </div>
      <Link to={`/course/${code}/addques`} className="ui button teal">Add Ques</Link>
    </div>
  );
};

export default SingleCourse;
