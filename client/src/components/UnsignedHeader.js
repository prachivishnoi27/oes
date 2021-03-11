import React from 'react';
import { Link } from 'react-router-dom';

const UnSignedHeader = () => {
  return (
    <div className="right menu">
      <Link className="item" to="/login">Login</Link>
      <Link className="item" to="/signup">Signup</Link>
    </div>
  )
}

export default UnSignedHeader;