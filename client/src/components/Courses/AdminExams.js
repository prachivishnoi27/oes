import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../Headers/AdminHeader';

const AdminExams = () => {
  const [mycourses, setMycourses] = useState([]);
  
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token') ?? '';
    // console.log(token);
        const response = await axios({
          method: 'get',
          url: 'http://localhost:5000/courses', 
          headers: { Authorization: `Bearer ${token}` }
        })
        // console.log(response.data)
      setMycourses(response.data);
      } catch (e) {
        console.log('Error in catch: ', e)
      }
    })()
  }, []);

  const renderList = () => {
    return mycourses.map((course) => {
      return (
        <div className="card" key={course.code}>
          <div 
          className="content">
            <Link to={`/course/${course.code}`} style={{'color': '#373e40'}}>
            <div className="header">
              Exam Code: {course.code}
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
      <AdminHeader/>
      <Link to="/createcourse" className="ui primary button right"><i className="plus icon"></i>Create New Exam</Link>
      <br></br>
      <br></br>
      <div className="ui cards">
        {mycourses.length === 0 ? "" : renderList()}
      </div>
    </div>
  )
}

export default AdminExams;