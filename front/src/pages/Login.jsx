// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "../api/axios"; // 위에서 만든 axios 인스턴스
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login", { id, pw }); // Spring 서버로 로그인 요청
      const token = res.data; // 서버에서 JWT 응답 받음
      localStorage.setItem("jwtToken", token); // 로컬 스토리지에 저장
      navigate("/main"); // 메인 페이지로 이동
    } catch (err) {
      alert("로그인 실패: 아이디 또는 비밀번호 오류");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>로그인</h2>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
      <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="PW" />
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
