import "./CreateAccount.css";
import React, { useState } from "react";
import StudentForm from './StudentForm';
import AdminForm from './AdminForm';

const CreateAccount = () => {
  const [createFor, setCreateFor] = useState("Student")

  const renderForm = (formType) => {
    if(formType === 'Admin') {
      return <AdminForm />
    }
    return <StudentForm />
  }

  return (
    <div className="background-layout">
      <div className="center-content">
        <div className="ui top attached tabular menu">
          <div
            onClick={() => setCreateFor("Admin")}
            className={`${createFor === "Admin" ? "active" : ""} item`}
          >
            Administrator
          </div>
          <div
            onClick={() => setCreateFor("Student")}
            className={`${createFor === "Admin" ? "" : "active"} item`}
          >
            Student
          </div>
        </div>
        <div>{renderForm(createFor)}</div>
        <div className="ui horizontal divider">Or</div>
        <div>Already have an account: Login</div>
      </div>
    </div>
  );
};

export default CreateAccount;
