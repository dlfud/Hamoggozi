import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [userInfo, setUserInfo] = useState()
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMain = async () => {
      try {
        const res = await axios.get("/main"); // 토큰 자동 첨부됨'
        setUserInfo(res.data)
      } catch (err) {
        alert("인증되지 않은 사용자입니다.");
        navigate("/");
      }
    };

    fetchMain();
  }, [navigate]);

  //user정보를 받고, postList 호출
  useEffect(() => {
    if (userInfo) {
      getPostList();
    }
  }, [userInfo]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  const getPostList = async () => {
    try {
      const res = await axios.post("/post/getPostList", {userUid: userInfo.uid});
      setPostList(res.data);
    } catch (err) {
      console.error("데이터 가져오기 실패", err);
    }
  }

  const goPostDetail = (postUid) => {
    navigate(`/post/postDetail/${postUid}`)
  }

   const insertPost = () => {
    navigate("/post/postInsertPage")
  }

  return (
    <div>
      <h2>메인 페이지</h2>
      <table border="1">
        <thead>
          <tr>
            <th>UID</th>
            <th>제목</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {postList.map(item => (
            <tr key={item.uid}>
              <td>{item.uid}</td>
              <td onClick={() => goPostDetail(item.uid)}>{item.title}</td>
              <td>{item.updateDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={insertPost}>글쓰기</button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Main;
