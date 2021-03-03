import React from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import CourseList from './Courses/CourseList';
import Signup from './Authentication/Signup';
import Admin from './Administrator/Admin';
import AdminCourses from './Courses/AdminCourses';
import CreateCourse from './Courses/CreateCourse';
import Addques from './Courses/AddQues';
import LoginAdmin from './Authentication/LoginAdmin';
import LogoutAdmin from './Authentication/LogoutAdmin';

const App = () => {
  console.log(localStorage.getItem('token'));
  console.log(localStorage.getItem('isSignedIn'));
  return (
    <BrowserRouter>
    <div className="ui container">
      <Switch>
        <Route path="/" component={CourseList} exact/>
        <Route path="/courses" component={AdminCourses} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" component={Admin} />
        <Route path="/createcourse" component={CreateCourse} />
        <Route path="/addques" component={Addques} />
        <Route path="/login" component={LoginAdmin} />
        <Route path="/logout" component={LogoutAdmin} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;