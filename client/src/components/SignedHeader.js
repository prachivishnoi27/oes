import React from 'react';
import { Link } from 'react-router-dom';

const SignedHeader = () => {
  const onLogout = () => {
    localStorage.setItem('isSignedIn', false);
    localStorage.setItem('token', '');
  }

  return (
    <div className="right menu">
      <Link className="item" to="/courses">My Courses</Link>
      <Link onClick={onLogout} className="item" to="/logout">Logout</Link>
    </div>
  );
}

export default SignedHeader;