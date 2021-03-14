import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header";

const UnAuthExam = () => {
  const { code } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/courses/${code}`,
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
        <div className="ui bulleted list">
        <div className="item">
          There is +{detail.marking.positive} marks for every right question
        </div>
        <div className="item">
            There is -{detail.marking.negative} marks for every wrong question.
        </div>
        <div className="item">Time: {detail.time} minutes</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div>
      {Object.keys(detail).length === 0 ? "" : renderDetails()}
      </div>
      <br></br>
      <Link to="" className="ui button primary">Start Exam</Link>
    </div>
  );
};

export default UnAuthExam;
