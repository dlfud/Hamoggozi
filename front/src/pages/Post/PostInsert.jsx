import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from "react-router-dom";

const InsertPost = ({ defaultCategory = 'ALL' }) => {
  const [category, setCategory] = useState()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const navigate = useNavigate();

  useEffect(() => {
      setCategory(defaultCategory);
  }, [defaultCategory]);

  const insertPost = async () => {
    try {
      const res = await axios.post("/post/insertPost", {category: category, title: title, content: content});
      if(res.data.code === '200'){
        navigate(`/`)
      }
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      navigate("/");
    }
  }

  const cancelInsertPost = () => {
    navigate(`/main`)
  }

  return (
    <div>
      <h2>글쓰기 페이지</h2>
      <input type="text" id="title" onChange={(e) => setTitle(e.target.value)}></input>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="ALL">All</option>
        <option value="TEST">test</option>
      </select>
      <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
              toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'imageUpload'],
              removePlugins: ['MediaEmbed', 'HtmlEmbed', 'Iframe'],
          }}
          onChange={(event, editor) => {
              setContent(editor.getData());
          }}
      />
      <button onClick={insertPost}>저장하기</button>
      <button onClick={cancelInsertPost}>취소</button>
    </div>
  );
};

export default InsertPost;