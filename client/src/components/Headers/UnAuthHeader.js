import React from "react";
import { Link } from 'react-router-dom';

const UnAuthHeader = () => {
  return (
    <div className="ui secondary menu">
      <Link to="/" className="item" style={{color: 'white'}}>Online Examination System</Link>
      <div className="right menu">
        <Link className="item" to="/login" style={{color: 'white'}}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default UnAuthHeader;
