import React from "react";
import { Link } from 'react-router-dom';

const UnAuthHeader = () => {
  return (
    <div className="ui menu">
      <Link to="/" className="item">Online Examination System</Link>
      <div className="right menu">
        <Link className="item" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default UnAuthHeader;
