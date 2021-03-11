import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from '../../apis/Axios';
import Header from '../Header';

const AdminCourses = () => {
  const [mycourses, setMycourses] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token') ?? '';
    console.log(token);
    (async () => {
      const response = await Axios.get('/courses', {
        headers: {
          Authorization: token
        }
      })
      console.log(response.data)
      setMycourses(response.data);
    })()
  }, []);

  const renderList = () => {
    return mycourses.map((course) => {
      return (
        <div className="item" style={{'border': '1px solid #c9cfd1'}} key={course.code}>
          <div 
          className="single line"
          style={{ padding: "5px"}}>
            <Link to={`/course/${course.code}`} style={{'color': '#373e40'}}>
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
      <Link to="/createcourse" className="ui primary button right"><i className="plus icon"></i>Create New Course</Link>
      <br></br>
      <div className="ui items celled table">
        {mycourses.length === 0 ? "" : renderList()}
      </div>
    </div>
  )
}

export default AdminCourses;