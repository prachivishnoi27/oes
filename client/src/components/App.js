import React from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import CourseList from './Courses/CourseList';
import Header from './Header';
import Signup from './Authentication/Signup';
import Admin from './Administrator/Admin';
import AdminCourses from './Courses/AdminCourses';
import CreateCourse from './Courses/CreateCourse';
import Addques from './Courses/AddQues';
import LoginAdmin from './Authentication/LoginAdmin';

const App = () => {
  return (
    <BrowserRouter>
    <div className="ui container">
    <Header />
      <Switch>
        <Route path="/" component={CourseList} exact/>
        <Route path="/courses" component={AdminCourses} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" component={Admin} />
        <Route path="/createcourse" component={CreateCourse} />
        <Route path="/addques" component={Addques} />
        <Route path="/login" component={LoginAdmin} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;