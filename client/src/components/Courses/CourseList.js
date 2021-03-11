import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../../apis/Axios";
import Header from '../Header';

const CourseList = () => {
  const [courseList, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get("/allcourses");
      setList(data);
    })();
  }, []);

  const renderList = () => {
    return courseList.map((course) => {
      return (
        <div className="item" style={{'border': '1px solid #c9cfd1'}} key={course.code}>
          <div 
          className="single line"
          style={{ padding: "5px"}}>
            <Link to="" style={{'color': '#373e40'}}>
            <div className="content menu">
              Course CODE: {course.code}
              <div className="description">
                {course.name}
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
      <Header />
      CourseList
      <br></br>
      <div className="ui items celled table">
        {courseList.length === 0 ? "" : renderList()}
      </div>
    </div>
  );
};

export default CourseList;
