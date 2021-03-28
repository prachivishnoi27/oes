import React from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../Headers/AdminHeader";

const ModifyQues = () => {
  const { code, quesid } = useParams();
  return (
    <div>
      <AdminHeader />
      <div>
        Modify Question Exam code: {code}
        Question id: {quesid}
      </div>
    </div>
  );
};

export default ModifyQues;
