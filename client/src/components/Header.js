import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui menu">
      <Link to="/" className="item">All Courses</Link>
      {/* <div className="right menu">
        <Link className="item">Sign Up</Link>
        <Link className="item">Login</Link>
      </div> */}
    </div>
  );
};

export default Header;
