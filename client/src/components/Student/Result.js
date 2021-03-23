import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentHeader from "../Headers/StudentHeader";

const Result = () => {
  const { code } = useParams();
  const [length, setLength] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState([]);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/result/${code}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentAnswer(response.data);
        setLength(response.data.length);
      } catch (e) {
        console.log("Error to get answers of students");
      }
    })();
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/courses/${code}/answers`,
        });
        setAnswer(response.data);
      } catch (e) {
        console.log("Error to get answers of exams");
      }
    })();
  }, []);

  const renderRows = () => {
    return answer.map((ans, i) => {
      return (
        <tr>
          <td data-label="Question No:">{i + 1}</td>
          <td data-label="Remark">
            {studentAnswer[i] === ans ? "Correct" : "Wrong Answer"}
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <StudentHeader />
      <div>Result: {code}</div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <table class="ui celled table" style={{ width: "40vw" }}>
          <thead>
            <tr>
              <th>Question No:</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>{length > 0 ? renderRows() : ""}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
