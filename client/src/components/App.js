import React from 'react';
import './App.css';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import RegisterAdmin from './Authentication/RegisterAdmin';
import RegisterStudent from './Authentication/RegisterStudent';
import Admin from './Administrator/Admin';
import AdminCourses from './Courses/AdminCourses';
import CreateCourse from './Courses/CreateCourse';
import Addques from './Courses/AddQues';
import Login from './Authentication/Login';
import SingleCourse from './Courses/SingleCourse';
import UnAuthExam from './Student/StudentExam';
import Signup from './Authentication/Signup';
import AllExams from './Student/AllExams';
import Exam from './Student/Exam';
import Student from './Student/Student';
import Home from './Home';
import New from './new';

const App = () => {
  console.log(localStorage.getItem('token'));
  console.log(localStorage.getItem('isSignedIn'));
  return (
    <BrowserRouter>
    <div className="ui container">
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/allexams" component={AllExams} exact />
        <Route path="/courses" component={AdminCourses} exact/>
        <Route path="/signup" component={Signup} exact />
        <Route path="/registeradmin" component={RegisterAdmin} exact/>
        <Route path="/registerstudent" component={RegisterStudent} exact />
        <Route path="/admin" component={Admin} exact/>
        <Route path="/student" component={Student} exact />
        <Route path="/createcourse" component={CreateCourse} exact />
        <Route path="/course/:code/addques" exact component={Addques}/>
        <Route path="/login" component={Login} exact/>
        <Route path="/course/:code" component={SingleCourse} exact/>
        <Route path="/:code" component={UnAuthExam} exact/>
        <Route path="/exam/:code" component={Exam} exact />
        <Route path="/new" component={New} exact/>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;