import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentHeader from "../Headers/StudentHeader";

const Result = () => {
  const { code } = useParams();
  const [length, setLength] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState([]);
  const [answer, setAnswer] = useState([{}]);

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
          url: `http://localhost:5000/answers/${code}`,
        });
        setAnswer(response.data);
      } catch (e) {
        console.log("Error to get answers of exams");
      }
    })();
  }, []);

  const renderRows = () => {
    return answer.map((ans, i) => {
      if (i === 0) return "";
      return (
        <tr>
          <td data-label="Question No:">{i}</td>
          <td data-label="Remark">
            {/* {studentAnswer[0]} */}
            {/* {studentAnswer[i-1]}, {ans.answer} */}
            {studentAnswer[i-1] === ans.answer ? "Correct": "Wrong Answer"}
            {/* {data[i].remark = studentAnswer[i] === ans.answer ? "Correct": "Wrong Answer"}  */}
          </td>
          <td data-label="Marks">
            {studentAnswer[i-1] === ans.answer ? ans.correct : "-" + ans.wrong}
            {/* {data[i].marks = studentAnswer[i] === ans.answer ? ans.correct: "-" + ans.wrong}  */}
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
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>{length > 0 ? renderRows() : ""}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
