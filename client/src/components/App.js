import React from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import CourseList from './Courses/CourseList';
import RegisterAdmin from './Authentication/RegisterAdmin';
import Admin from './Administrator/Admin';
import AdminCourses from './Courses/AdminCourses';
import CreateCourse from './Courses/CreateCourse';
import Addques from './Courses/AddQues';
import LoginAdmin from './Authentication/LoginAdmin';
import LogoutAdmin from './Authentication/LogoutAdmin';
import SingleCourse from './Courses/SingleCourse';
import UnAuthExam from './Courses/UnAuthExam';

const App = () => {
  console.log(localStorage.getItem('token'));
  console.log(localStorage.getItem('isSignedIn'));
  return (
    <BrowserRouter>
    <div className="ui container">
      <Switch>
        <Route path="/" component={CourseList} exact/>
        <Route path="/courses" component={AdminCourses} exact/>
        <Route path="/signup" component={RegisterAdmin} exact/>
        <Route path="/admin" component={Admin} />
        <Route path="/createcourse" component={CreateCourse} />
        <Route path="/course/:code/addques" exact component={Addques} />
        <Route path="/login" component={LoginAdmin} />
        <Route path="/logout" component={LogoutAdmin} />
        <Route path="/course/:code" component={SingleCourse} />
        <Route path="/:code" component={UnAuthExam} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;