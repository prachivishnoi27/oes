import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import StudentHeader from '../Headers/StudentHeader';

const AllExams = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios({
          method: 'get',
          url: 'http://localhost:5000/allcourses'
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
    <div>
      <StudentHeader/>
      All Exams
      <br></br>
      <div style={{ marginTop: '10px'}} className="ui cards">
        {list.length === 0 ? "" : renderList()}
      </div>
    </div>
  );
};

export default AllExams;
