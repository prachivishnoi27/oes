import React from 'react';
import { Link } from 'react-router-dom';

const SignedHeader = () => {
  return (
    <div className="right menu">
      <Link className="item" to="/courses">My Courses</Link>
      <Link className="item" to="/logout">Logout</Link>
    </div>
  );
}

export default SignedHeader;