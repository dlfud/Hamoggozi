import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // 위에서 만든 axios 인스턴스
import { useNavigate } from "react-router-dom";
import '../Common.css';
import '../App.css';

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get("/validate-token");
        if (res.data.valid) {
          navigate("/groupList");
        }
      } catch (err) {
        console.log("토큰 없음 or 유효하지 않음");
      }
    };

    checkToken();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login", { id: id, pw: pw });
      const token = res.data; 
      localStorage.setItem("jwtToken", token);
      navigate("/groupList");
    } catch (err) {
      alert("로그인 실패: 아이디 또는 비밀번호 오류");
    }
  };

  const goJoinPage = () => {
    navigate("/join");
  }

  return (
    <div className="container">
      <div className="content">
        <h2 className="loginLogo">
          <div className="loginLogoText">HAMO</div>
        </h2>
        <div className="loginContent">
          <div className="inputDiv">
            <input className="loginInput mb10" type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
            <input className="loginInput" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="PW" />
          </div>
          <div className="btnDiv">
            <button className="loginBtn" onClick={handleLogin}>로그인</button>
            <button className="joinBtn" onClick={goJoinPage}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
