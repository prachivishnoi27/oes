import React from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import CourseList from './Courses/CourseList';
import Header from './Header';

const App = () => {
  return (
    <BrowserRouter>
    <div className="ui container">
    <Header />
      <Switch>
        <Route path="/" component={CourseList} exact/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;