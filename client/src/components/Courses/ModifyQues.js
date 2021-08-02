import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import AdminHeader from "../Headers/AdminHeader";

const ModifyQues = () => {
  const [modify, setModify] = useState(false);
  const { code, quesid } = useParams();
  const [question, setQuestion] = useState({
      ques: '',
      answer: '',
      options: [],
      marks_wrong: '',
      marks_correct: ''
  });
  const [ques, setQues] = useState('');
  const [options, setOptions] = useState({
    a: '',
    b: '',
    c: '',
    d: ''
  });
  const [answer, setAns] = useState('');
  const [marks_correct, setMarks_correct] = useState('');
  const [marks_wrong, setMarks_wrong] = useState('');

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios({
          method: "get",
          url: `${baseUrl}/courses/${code}/${quesid}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestion(data);
        setQues(data.ques);
        setAns(data.answer);
        setMarks_wrong(data.marks_wrong)
        setMarks_correct(data.marks_correct);
        const obj = {};
        obj.a = data.options[0].value;
        obj.b = data.options[1].value;
        obj.c = data.options[2].value;
        obj.d = data.options[3].value;
        setOptions(obj);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if(modify === true) {
    return <Redirect to={`/course/${code}`} />;
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(question);
      const _question = question;
      _question.ques =  ques;
      _question.answer = answer;
      _question.marks_correct = marks_correct;
      _question.marks_wrong = marks_wrong;
      _question.options[0].value = options.a;
      _question.options[1].value = options.b;
      _question.options[2].value = options.c;
      _question.options[3].value = options.d;
      setQuestion(_question);
      (async () => {
          const token = localStorage.getItem('token');
        try {
            const response = await axios({
                method: 'patch',
                url: `${baseUrl}/courses/${code}/${quesid}`,
                headers: { Authorization: `Bearer ${token}`},
                data: question
            })
            console.log(response.data.length);
            setModify(true);
        } catch (e) {
            console.log(e);
        }
      })();
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setOptions((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(options);
  }

  const renderQuestion = () => {
    return (
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label>Question</label>
          <input
            type="text"
            id="question"
            value={ques}
            onChange={(e) => setQues(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Option A:</label>
          <input
            type="text"
            id="a"
            value={options.a}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Option B:</label>
          <input
            type="text"
            id="b"
            value={options.b}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Option C:</label>
          <input
            type="text"
            id="c"
            value={options.c}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Option D:</label>
          <input
            type="text"
            id="d"
            value={options.d}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Answer</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAns(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Marking</label>
          <div>
            Positive:
            <input
              type="text"
              id="marks_correct"
              value={marks_correct}
              onChange={(e) => setMarks_correct(e.target.value)}
            />
          </div>
          <div>
            Negative:
            <input
              type="text"
              id="marks_wrong"
              value={marks_wrong}
              onChange={(e) => setMarks_wrong(e.target.value)}
            />
          </div>
        </div>
        <button
          className="ui button primary"
          style={{ marginBottom: "10px" }}
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    );
  };

  return (
    <div className="admin">
      <div className="ui container">
      <AdminHeader />
      <div>
        <div style={{ marginBottom: '10px'}}>{question.options.length === 0? '': renderQuestion()}</div>
      </div>
      </div>
    </div>
  );
};

export default ModifyQues;
