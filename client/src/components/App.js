import React from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import CourseList from './Courses/CourseList';
import Header from './Header';
import Signup from './Authentication/Signup';
import Admin from './Administrator/Admin';

const App = () => {
  return (
    <BrowserRouter>
    <div className="ui container">
    <Header />
      <Switch>
        <Route path="/" component={CourseList} exact/>
        <Route path="/signup" component={Signup} />
        <Route path="/admin" component={Admin}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;