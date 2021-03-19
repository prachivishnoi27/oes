import "./Home.css";
import React  from "react";
import UnAuthHeader from './Headers/UnAuthHeader';

const Home = () => {
  console.log(localStorage.getItem('isSignedInStudent'), 'std');
  console.log(localStorage.getItem('isSignedInAdmin'), 'admin')

  return (
    <div>
      <UnAuthHeader/>
      <div className="top-center">
        <h1>Online Examination system</h1>
      </div>
    </div>
  );
};

export default Home;
