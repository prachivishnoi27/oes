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

  const addquesRequest = async (payload) => {
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
    console.log(ques);
    console.log(options);
    console.log(answer);
    const payload = {
      "ques": ques,
      "options": [
        {
          "a": options.a
        },
        {
          "b": options.b
        },
        {
          "c": options.c
        },
        {
          "d": options.d
        }
      ],
      "ans": answer
    }
    addquesRequest(payload);
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
      <div>Add question to Course Code: {code} </div>
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
        <button
          className="ui button primary"
          onClick={handleSubmit}
        >
          Add Ques
        </button>
      </form>
    </div>
  )
}

export default Addques;