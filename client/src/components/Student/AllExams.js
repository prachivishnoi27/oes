import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from "../../utils/baseUrl";
import StudentHeader from '../Headers/StudentHeader';

const AllExams = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/allcourses`
        })
        setList(data);
      } catch (e) {
        console.log('cannot get list: ', e)
      }
    })();
  }, []);

  const renderList = () => {
    return list.map((course) => {
      return (
        <div className="card" key={course.code}>
          <div 
          className="content"
          style={{ padding: "5px"}}>
            <Link to={`/${course.code}`} style={{'color': '#373e40'}}>
            <div className="header">
              Exam Code: {course.code}
              <div className="description">
                Exam Topic: {course.name}
              </div>
              <div className="right description">
                Time: {course.time}
              </div>
              </div>
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="student">
      <div className="ui container">
      <StudentHeader/>
      All Exams
      <br></br>
      <div style={{ marginTop: '10px'}} className="ui cards">
        {list.length === 0 ? "" : renderList()}
      </div>
      </div>
    </div>
  );
};

export default AllExams;
