import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StudentHeader from "../Headers/StudentHeader";

const StudentExam = () => {
  const { code } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/${code}`,
        });
        setDetail(response.data);
      } catch (e) {
        console.log(e, "in catch");
      }
    })();
  }, []);

  const renderDetails = () => {
    return (
      <div>
        <h2>Exam Code: {code}</h2>
        <h2>Topic: {detail.name}</h2>
        <div className="item">Time: {detail.time} minutes</div>
      </div>
    )
  }

  return (
    <div>
      <StudentHeader />
      <div>
      {Object.keys(detail).length === 0 ? "" : renderDetails()}
      </div>
      <br></br>
      <Link to={`/exam/${code}`} className="ui button primary">Start Exam</Link>
    </div>
  );
};

export default StudentExam;
