import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminHeader from "../Headers/AdminHeader";
import axios from "axios";

const SingleExam = () => {
  const { code } = useParams();
  const [exam, setExam] = useState({
    name: "",
    questions: [],
  });

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/courses/${code}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        setExam({
          name: response.data.name,
          questions: response.data.questions,
        });
      } catch (e) {
        console.log(e, "in catch");
      }
    })();
  }, [code, exam]);

  const handleDelete = (e) => {
    console.log(e.target.id);
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "patch",
          url: `http://localhost:5000/deleteques/${code}/${e.target.id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        const _exam = exam;
        exam.questions = [];
        setExam(_exam);
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const renderList = () => {
    return exam.questions.map((question) => {
      return (
        <div
          className="row item"
          style={{
            border: "1px solid #9BBACB",
            borderRadius: "1%",
            background: "white",
            margin: "10px",
            padding: "15px",
            fontSize: "14px",
          }}
          key={question._id}
        >
          <div className="column ">
            <div className="header">{question.ques}</div>
            <div className="bulleted">
              <div className="list">
                <div className="item">{question.options[0].value}</div>
                <div className="item">{question.options[1].value}</div>
                <div className="item">{question.options[2].value}</div>
                <div className="item">{question.options[3].value}</div>
              </div>
            </div>
          </div>
          <br></br>
          <Link
            to={`/exam/${code}/${question._id}`}
            className="ui button"
            style={{ marginRight: "10px" }}
          >
            Modify
          </Link>
          or
          <div
            // to={`/exam/${code}/delete/${question._id}`}
            style={{ marginLeft: "10px" }}
            id={question._id}
            onClick={handleDelete}
            className="ui red button"
          >
            {" "}
            Delete
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <AdminHeader />
      <h2>Exam Code: {code}</h2>
      <h2>Exam Name: {exam.name}</h2>
      <h3>Questions</h3>
      <div className="ui list">{renderList()}</div>
      <Link
        to={`/course/${code}/addques`}
        style={{ marginBottom: "10px" }}
        className="ui button teal"
      >
        Add Question
      </Link>
    </div>
  );
};

export default SingleExam;
