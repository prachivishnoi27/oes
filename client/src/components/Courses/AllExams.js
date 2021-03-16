import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Headers/Header';

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
        <div className="item" style={{'border': '1px solid #c9cfd1'}} key={course.code}>
          <div 
          className="single line"
          style={{ padding: "5px"}}>
            <Link to={`/${course.code}`} style={{'color': '#373e40'}}>
            <div className="content menu">
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
      <Header auth="student"/>
      All Exams
      <br></br>
      <div className="ui items celled table">
        {list.length === 0 ? "" : renderList()}
      </div>
    </div>
  );
};

export default AllExams;
