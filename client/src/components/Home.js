import "./Home.css";
import React  from "react";
import Header from './Headers/Header';

const Home = () => {
  console.log(localStorage.getItem('isSignedInStudent'), 'std');
  console.log(localStorage.getItem('isSignedInAdmin'), 'admin')

  return (
    <div>
      <Header auth="null"/>
      <div className="top-center">
        <h1>Online Examination system</h1>
      </div>
    </div>
  );
};

export default Home;
