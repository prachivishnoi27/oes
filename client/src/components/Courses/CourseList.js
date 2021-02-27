import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import courses from '../../apis/courses';

const CourseList = () => {
  const [courseList, setList] = useState([])

  useEffect(() => {
    ( async () => {
      const { data } = await courses.get('/allcourses');
      console.log(data)
      setList(data);
    })()
  }, []);

  const renderList = () => {
    return courseList.map( course => {
      return (
        <div className="item" style={{'padding': '5px'}} key={course.code} >
          <div className="content">
          Course CODE: {course.code}
          <div className="description">
          <Link to="" >
                {course.name}
              </Link>
          </div>
          </div>
        </div>
      );
    })
  }

  return (
    <div>
      CourseList
      <br></br>
      <div className="ui items menu">
      {courseList.length === 0? '': renderList()}
      </div>
    </div>
  );
};

export default CourseList;