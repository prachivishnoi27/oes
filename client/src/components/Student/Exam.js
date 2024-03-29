import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { Form, Radio, Button, Header, Icon, Modal } from "semantic-ui-react";
import Timer from "./Timer";

const Questions = ({ answer, setAnswer, question }) => {
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
            label={question.options[0].value}
            name="answer"
            value="a"
            checked={answer === "a" ? true : false}
            onChange={(e, { value }) => {
              setAnswer(value);
            }}
          />
        </Form.Field>
        <Form.Field className="content">
          <Radio
            label={question.options[1].value}
            name="answer"
            value="b"
            checked={answer === "b" ? true : false}
            onChange={(e, { value }) => {
              setAnswer(value);
            }}
          />
        </Form.Field>
        <Form.Field className="content">
          <Radio
            label={question.options[2].value}
            name="answer"
            value="c"
            checked={answer === "c" ? true : false}
            onChange={(e, { value }) => {
              setAnswer(value);
            }}
          />
        </Form.Field>
        <Form.Field className="content">
          <Radio
            label={question.options[3].value}
            name="answer"
            value="d"
            checked={answer === "d" ? true : false}
            onChange={(e, { value }) => {
              setAnswer(value);
            }}
          />
        </Form.Field>
      </Form>
      <br></br>
      <div>Marking: +{question.marks_correct} , -{question.marks_wrong}</div>
    </div>
  );
};

const Model = ({ open, setOpen, handleSubmit }) => {
  return (
    <Modal
      basic
      onClose={() => setOpen()}
      onOpen={() => setOpen()}
      open={open}
      size="small"
    >
      <Header>Time's up!</Header>
      <Modal.Content>
        <p>Your time for exam is up. Click on Continue</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={handleSubmit}>
          <Icon name="checkmark" /> Continue
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const Exam = () => {
  const { code, time } = useParams();
  const [submitted, setSubmitted] = useState(false);
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
        console.log(response.data);
        setQuestions(response.data);
      } catch (e) {
        console.log("error in catch", e);
      }
    })();
  }, []);

  const handleSubmit = () => {
    (async () => {
      console.log("Answer: ", answers);
      const token = localStorage.getItem("token");
      const postAnswer = [];
      for (var ans in answers) {
        postAnswer.push({ value: answers[ans] });
      }
      // console.log('Post answers length: ', postAnswer.length);
      const payload = { option: postAnswer };
      console.log(payload);
      try {
        const response = await axios({
          method: "post",
          url: `http://localhost:5000/result/${code}`,
          data: payload,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        setSubmitted(true);
      } catch (e) {
        console.log("Cannot post answers by student to db");
      }
    })();
  };

  console.log("Answee values ::: ", answers);

  const renderQuestions = () => {
    return questions.map((question, i) => {
      return (
        <Questions
          answer={answers[i]}
          setAnswer={(value) => {
            setAnswers({
              ...answers,
              [i]: value,
            });
          }}
          question={question}
        />
      );
    });
  };

  const [isTimeOut, setTimeOut] = useState(false);

  return (
    <div className="ui container">
      {submitted && <Redirect to={`/result/${code}`} />}
      <Timer time={time} setTimeOut={setTimeOut} />
      <div>{questions.length === 0 ? "" : renderQuestions()}</div>
      <div style={{ textAlign: "center" }}>
        <div
          onClick={handleSubmit}
          className="ui primary button"
          style={{ cursor: "pointer" }}
        >
          Submit
        </div>
      </div>
      <br></br>
      <Model
        open={isTimeOut}
        setOpen={() => setTimeOut(false)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Exam;
