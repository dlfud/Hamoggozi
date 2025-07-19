import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const { uid } = useParams();
  const [postData, setPostData] = useState({})
  const [markdown, setMarkdown] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getPostDetail()
  }, [uid]);

  const getPostDetail = async () => {
    try {
      const res = await axios.post("/post/getPostDetail", {uid: uid});
      setPostData(res.data)
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      navigate("/");
    }
  }

  const goPostList = () => {
    navigate("/");
  }

  const updatePost = () => {
    navigate(`/post/postUpdatePage/${uid}`)
  }

  const deletePost = async () => {
    try {
      const res = await axios.post("/post/deletePost", {uid: uid});
      if(res.data.code == '200'){
        alert("삭제 되었습니다.")
        navigate("/main")
      }
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      navigate("/");
    }
  }

  return (
    <div>
      <h2>상세 페이지</h2>
      <button onClick={goPostList}>목록으로</button>
      <button onClick={deletePost}>삭제</button>
      <button onClick={updatePost}>수정하기</button>
      <p>UID: {uid}</p>
      <p>TITLE: {postData.title}</p>
      <p>CONTENT: </p><ReactMarkdown>{postData.content}</ReactMarkdown>
      <p>userName: {postData.userName}</p>
      <p>updateDate: {postData.updateDate}</p>
    </div>
  );
};

export default PostDetail;