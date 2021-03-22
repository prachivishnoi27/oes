import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StudentHeader from "../Headers/StudentHeader";
import { Form, Radio } from "semantic-ui-react";

const Questions = ({ answer, setAnswer, question}) => {
  return (
    <div
      style={{
        background: "white",
        margin: "15px",
        padding: "10px",
        border: "1px solid #BCC5CA",
        borderRadius: "3px",
      }}
      key={question._id}
    >
      <Form className="content">
        <Form.Field className="header">
          <div>{question.ques}</div>
        </Form.Field>
        <Form.Field className="content">
          <Radio
            label={question.options[0].a}
            name="answer"
            value="a"
            checked={answer === "a"? true: false}
            onChange={(e, { value }) => {
              setAnswer(value);
            }}
          />
        </Form.Field>
        <Form.Field className="content">
          <Radio
            label={question.options[1].b}
            name="answer"
            value="b"
            checked={answer === "b"? true:false}
            onChange={(e, { value }) => {
              setAnswer(value);
            }}
          />
        </Form.Field>
        <Form.Field className="content">
          <Radio
            label={question.options[2].c}
            name="answer"
            value="c"
            checked={answer === "c"? true:false}
            onChange={(e, { value }) => {
              setAnswer(value);
            }}
          />
        </Form.Field>
        <Form.Field className="content">
          <Radio
            label={question.options[3].d}
            name="answer"
            value="d"
            checked={answer === "d"? true:false}
            onChange={(e, { value }) => {
              setAnswer(value);
            }}
          />
        </Form.Field>
      </Form>
    </div>
  );
};

const Exam = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/courses/${code}/questions`,
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response.data);
        // setAnswers(new Array(response.data.length));
      } catch (e) {
        console.log("error in catch", e);
      }
    })();
  }, []);

  const handleSubmit = () => {
    console.log('Answer: ', answers);
  }

  console.log("Answee values ::: ", answers)

  const renderQuestions = () => {
    return questions.map((question, i) => {
      return <Questions
            answer={answers[i]}
            setAnswer={(value) => {
              // const newAns = answers;
              // newAns[i] = value;
              setAnswers({
                ...answers,
                [i]: value, 
              });
            }}
            question={question}
      />;
    });
  }

  return (
    <div>
      <StudentHeader />
      <div>Exam: {code}</div>
      <div>
        {questions.length === 0 ? "": renderQuestions()}
      </div>
      <div style={{textAlign: 'center'}}>
      <div onClick={handleSubmit} className="ui primary button" style={{ cursor: "pointer" }}>Submit</div>
      </div>
      <br></br>
    </div>
  );
};

export default Exam;