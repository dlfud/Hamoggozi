import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const InsertPost = () => {
  const [postData, setPostData] = useState({})
  const navigate = useNavigate();

  const insertPost = () => {

  }

  const cancelInsertPost = () => {
    navigate(`/main`)
  }

  return (
    <div>
      <h2>상세 페이지</h2>
      <button onClick={insertPost}>저장하기</button>
      <button onClick={cancelInsertPost}>취소</button>
    </div>
  );
};

export default InsertPost;