import React from "react";
import UnAuthHeader from "./UnAuthHeader";
import AdminHeader from "./AdminHeader";
import StudentHeader from "./StudentHeader";

const Header = ({ auth }) => {
  if (auth === 'admin') {
    return <AdminHeader />;
  }

  if (auth === 'student') {
    return <StudentHeader />;
  }

  return <UnAuthHeader />;
};

export default Header;
