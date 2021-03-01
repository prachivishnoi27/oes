import React from "react";
import { Link } from 'react-router-dom';
import SignedHeader from './SignedHeader';
import UnSignedHeader from './UnsignedHeader';

const Header = () => {
  const isSignedIn  = localStorage.getItem('isSignedIn') || 'false';
  return (
    <div className="ui menu">
      <Link to="/" className="item">All Courses</Link>
      {isSignedIn === 'true'? <SignedHeader />: <UnSignedHeader />}
    </div>
  );
};

export default Header;
