// src/pages/MainPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMain = async () => {
      try {
        const res = await axios.get("/main"); // 토큰 자동 첨부됨
        setMessage(res.data);
      } catch (err) {
        alert("인증되지 않은 사용자입니다.");
        navigate("/");
      }
    };

    fetchMain();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <div>
      <h2>메인 페이지</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Main;
