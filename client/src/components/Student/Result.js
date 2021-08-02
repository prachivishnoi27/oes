import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import StudentHeader from "../Headers/StudentHeader";

const headers = [
  { label: "Question No:", key: "no" },
  { label: "Remark", key: "remark" },
  { label: "Marks", key: "marks" },
];

const Result = () => {
  const { code } = useParams();
  const [data, setData] = useState({
    d: [],
    csv: {},
  });
  const [studentAnswer, setStudentAnswer] = useState([]);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${baseUrl}/result/${code}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentAnswer(response.data);
      } catch (e) {
        console.log("Error to get answers of students");
      }
    })();
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${baseUrl}/answers/${code}`,
        });
        // console.log("Response answer : ", response)
        setAnswer(response.data);
      } catch (e) {
        console.log("Error to get answers of exams", e, e.response);
      }
    })();
  }, []);

  // console.log(studentAnswer, answer);

  const renderRows = () => {
    // console.log("Render row : ", data);
    return data.d.map((dd, i) => {
      // console.log(d, i);
      return (
        <tr>
          <td data-label="Question No:">{dd.no}</td>
          <td data-label="Remark">{dd.remark}</td>
          <td data-label="Marks">{dd.marks}</td>
        </tr>
      );
    });
  };

  let csvReport = { headers: headers, filename: "result.csv", data: [] };

  const setTableData = async () => {
    let _data = studentAnswer.map((a, i) => {
      // console.log(i, answer, studentAnswer);
      return {
        no: i + 1,
        remark: a === answer[i + 1].answer ? "Correct" : "Wrong Answer",
        marks:
          a === answer[i + 1].answer
            ? answer[i + 1].correct
            : `-${answer[i + 1].wrong}`,
      };
    });
    setData({
      d: _data,
      csv: { headers, filename: "result.csv", data: _data },
    });
  };

  useEffect(() => {
    if (studentAnswer.length > 0 && answer.length > 0) {
      setTableData();
    }
  }, [studentAnswer, answer]);

  return (
    <div className="student">
      <div className="ui container">
      <StudentHeader />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="ui items">
          <table class="ui celled table" style={{ width: "50vw" }}>
            <thead>
              <tr>
                <th>Question No:</th>
                <th>Remark</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>{renderRows(data)}</tbody>
          </table>
        <div className="item" style={{ alignItems: 'center', width: '100%', justifyContent: 'center'}}>
          {console.log(data)}
          {data.csv.data?.length > 0 ? (
            <CSVLink className="ui button primary column" {...data.csv}>Download</CSVLink>
          ) : (
            ""
          )}
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Result;
