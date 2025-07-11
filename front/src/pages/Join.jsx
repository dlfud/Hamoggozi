// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/join', {
        id,
        pw,
        name,
        phone,
      });

      alert(response.data); // ex: 회원가입 성공
      navigate('/login'); // 가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      alert('회원가입 실패');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>ID: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>PW: </label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
        </div>
        <div>
          <label>NAME: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>PHONE: </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;
