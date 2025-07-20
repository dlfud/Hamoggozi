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
      <div className="searchDiv">
        <select className="search mr10">
          <option value="All">ALL</option>
        </select>
        <input className="search" type="text" placeholder="Post"></input>
        <select className="rowCountSelect"></select>
      </div>
      
      <div className="postMenu">
        <button className="postMenuBtn" onClick={insertPost}>글쓰기</button>
      </div>
      <div className="postDiv">
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
      </div>

      <div className="oneDiaryDiv">
        <div className="oneDiaryList">
          <div className="oneDiaryDate mr10">2025-07-20 11:30</div>
          <div className="oneDiaryContent">asdfasdf</div>
        </div>
        <div className="oneDiaryInputBtn">
          <input className="oneDiaryInput" typ1e="text"></input>
          <button className="oneDiarySendBtn">보내기</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
