import React from 'react';
import './App.css';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import RegisterAdmin from './Authentication/RegisterAdmin';
import Admin from './Administrator/Admin';
import AdminCourses from './Courses/AdminCourses';
import CreateCourse from './Courses/CreateCourse';
import Addques from './Courses/AddQues';
import Login from './Authentication/Login';
import LogoutAdmin from './Authentication/LogoutAdmin';
import SingleCourse from './Courses/SingleCourse';
import UnAuthExam from './Courses/UnAuthExam';
import Signup from './Authentication/Signup';
import Header from './Headers/Header';
import Home from './Home';
import New from './new';

const App = () => {
  console.log(localStorage.getItem('token'));
  console.log(localStorage.getItem('isSignedIn'));
  return (
    <BrowserRouter>
    <div className="ui container">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/courses" component={AdminCourses} exact/>
        <Route path="/signup" component={Signup} exact />
        <Route path="/registeradmin" component={RegisterAdmin} exact/>
        <Route path="/admin" component={Admin} exact/>
        <Route path="/createcourse" component={CreateCourse} exact />
        <Route path="/course/:code/addques" exact component={Addques}/>
        <Route path="/login" component={Login} exact/>
        <Route path="/logout" component={LogoutAdmin} exact/>
        <Route path="/course/:code" component={SingleCourse} exact/>
        <Route path="/:code" component={UnAuthExam} exact/>
        <Route path="/new" component={New} exact/>
        {/* <Route path="/exam/:code" component={} /> */}
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;