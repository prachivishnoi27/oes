import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentHeader from "../Headers/StudentHeader";
import { Form, Radio } from "semantic-ui-react";

const Questions = ({questions, setAnswers, answers}) => {
    return questions.map((question, i) => {
      return (
        <div key={question._id}>
          <Form>
            <Form.Field>
              <div>{question.ques}</div>
            </Form.Field>
            <Form.Field>
              <Radio
                label={question.options[0].a}
                name="answer"
                value="a"
                checked={answers[i] === "a"}
                onChange={(e, { value }) => {
                    const newAns = answers;
                    newAns[i] = value;
                    setAnswers(newAns)
                }}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label={question.options[0].b}
                name="answer"
                value="b"
                checked={answers[i] === "b"}
                onChange={(e, { value }) => {
                    const newAns = answers;
                    newAns[i] = value;
                    setAnswers(newAns)
                }}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label={question.options[0].c}
                name="answer"
                value="c"
                checked={answers[i] === "c"}
                onChange={(e, { value }) => {
                    const newAns = answers;
                    newAns[i] = value;
                    setAnswers(newAns)
                }}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label={question.options[0].d}
                name="answer"
                value="d"
                checked={answers[i] === "d"}
                onChange={(e, { value }) => {
                    const newAns = answers;
                    newAns[i] = value;
                    setAnswers(newAns)
                }}
              />
            </Form.Field>
          </Form>
        </div>
      );
    });
  };

const Exam = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

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
        setAnswers(new Array(response.data.length))
      } catch (e) {
        console.log("error in catch", e);
      }
    })();
  }, []);

  console.log("Answers :: ", answers)

  return (
    <div>
      <StudentHeader />
      <div>Exam: {code}</div>
      {questions.length === 0 ? "" : <Questions questions={questions || []} answers={answers} setAnswers={setAnswers} />}
    </div>
  );
};

export default Exam;
