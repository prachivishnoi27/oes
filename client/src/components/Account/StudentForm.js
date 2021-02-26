import React from "react";
import AdminForm from "./AdminForm";

const StudentForm = () => {
  return (
    <div className="ui bottom segment">
      <form className="ui form styling-form">
        <div className="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" />
        </div>
        <div className="field">
          <label>E-mail</label>
          <input type="email" placeholder="xyz@abc.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" />
        </div>
        <button className="ui button primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
