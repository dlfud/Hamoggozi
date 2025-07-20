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
  
  const goLogin = () => {
    navigate('/')
  }

  return (
    <div className='container'>
      <div className='content'>
        <div>
          <h2 className="joinLogo">
            <div className="joinLogoText">HAMO</div>
          </h2>
          <div className='joinContent'>
            <div className='joinInputDiv'>
              <div className='joinInputContent'>
                <label className='joinLabel'>ID: </label>
                <input className='joinInput' type="text" value={id} onChange={(e) => setId(e.target.value)} required />
              </div>
              <div className='joinInputContent'>
                <label className='joinLabel'>PW: </label>
                <input className='joinInput' type="password" value={pw} onChange={(e) => setPw(e.target.value)} required />
              </div>
              <div className='joinInputContent'>
                <label className='joinLabel'>NAME: </label>
                <input className='joinInput' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className='joinInputContent'>
                <label className='joinLabel'>PHONE: </label>
                <input className='joinInput' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>
            <div className='btnDiv'>
              <button className='loginBtn' onClick={handleSignup}>회원가입</button>
              <button className='joinBtn' onClick={goLogin}>로그인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
