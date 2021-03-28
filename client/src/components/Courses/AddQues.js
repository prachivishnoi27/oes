import React, {useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminHeader from '../Headers/AdminHeader';

const Addques = () => {
  const { code } = useParams();
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

  const addques = async (payload) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "patch",
        url: `http://localhost:5000/courses/${code}/addques`,
        data: payload,
        headers: { Authorization: `Bearer ${token}`}
      })
      console.log(response.data);
      console.log('Question added successfully');
    } catch (e) {
      console.log(e, 'in catch');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(ques);
    // console.log(options);
    // console.log(answer);
    const payload = {
      ques,
      options: [
        {
          value: options.a
        },
        {
          value: options.b
        },
        {
          value: options.c
        },
        {
          value: options.d
        }
      ],
      answer,
      marks_correct,
      marks_wrong
    }
    addques(payload);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setOptions((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  return (
    <div>
      <AdminHeader/>
      <h2>Add question to Exam Code: {code} </h2>
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
          style={{ marginBottom: '10px'}}
          onClick={handleSubmit}
        >
          Add Question
        </button>
      </form>
    </div>
  )
}

export default Addques;