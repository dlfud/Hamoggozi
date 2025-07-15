import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = ({ defaultCategory = 'ALL' }) => {
  const { uid } = useParams();
  const [postData, setPostData] = useState({})
  const [category, setCategory] = useState()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const navigate = useNavigate();

  useEffect(() => {
      setCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.post("/post/getPostDetail", {uid: uid});
        const convertedContent = marked(res.data.content);
        setPostData({ ...res.data, content: convertedContent });
      } catch (err) {
        alert("인증되지 않은 사용자입니다.");
        navigate("/");
      }
    };

    fetchPost();
  }, [uid]);

  useEffect(() => {
    setTitle(postData.title)
    setCategory(postData.category)
    setContent(postData.content)
  }, [postData])

  const updatePost = async () => {
    try {
      const res = await axios.post("/post/updatePost", {uid: uid, category: category, title: title, content: content});
      if(res.data.code === '200'){
        navigate(`/`)
      }
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      navigate("/");
    }
  }

  const cancelUpdatePost = () => {
    navigate(`/post/postDetail/${uid}`)
  }


  return (
    <div>
      <h2>상세 페이지</h2>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="ALL">All</option>
        <option value="TEST">test</option>
      </select>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
            setContent(editor.getData());
        }}
      />
      <button onClick={updatePost}>수정하기</button>
      <button onClick={cancelUpdatePost}>취소</button>
      <p>UID: {uid}</p>
    </div>
  );
};

export default UpdatePost;