import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const { uid } = useParams();
  const [postData, setPostData] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.post("/post/getPostDetail", {uid: uid});
        setPostData(res.data)
      } catch (err) {
        alert("인증되지 않은 사용자입니다.");
        navigate("/");
      }
    };

    fetchPost();
  }, [uid]);

  const updatePost = () => {

  }

  const cancelUpdatePost = () => {
    navigate(`/post/postDetail/${uid}`)
  }


  return (
    <div>
      <h2>상세 페이지</h2>
      <button onClick={updatePost}>수정하기</button>
      <button onClick={cancelUpdatePost}>취소</button>
      <p>UID: {uid}</p>
    </div>
  );
};

export default UpdatePost;