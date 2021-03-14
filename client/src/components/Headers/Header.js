import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SignedHeader from './SignedHeader';
import UnSignedHeader from './UnsignedHeader';

const Header = () => {
  const [isSignedIn, setIsSignedIn] = useState('false');
  useEffect(() => {
    setIsSignedIn(localStorage.getItem('isSignedIn'));
  }, [localStorage.getItem('isSignedIn')])
  return (
    <div className="ui menu">
      <Link to="/" className="item">Online Examination system</Link>
      {isSignedIn === 'true'? <SignedHeader />: <UnSignedHeader />}
    </div>
  );
};

export default Header;
