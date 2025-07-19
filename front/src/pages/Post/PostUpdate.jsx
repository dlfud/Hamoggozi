import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import { useNavigate, useParams } from "react-router-dom";
import { MyCustomUploadAdapterPlugin, extractTempImages
        , uploadedTempImages, deleteTempImages, 
        extractImages} from '../../util/UploadPostFileUtil';

const UpdatePost = ({ defaultCategory = 'ALL' }) => {
  const { uid } = useParams();
  const [postData, setPostData] = useState({})
  const [category, setCategory] = useState()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [initialImages, setInitialImages] = useState([])
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

        const imgTags = extractImages(convertedContent);
        setInitialImages(imgTags);
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
      const usedImages = extractImages(content);

      const imagesToDelete = initialImages.filter(img => !usedImages.includes(img))

      const imagesToMove = []
      const tempImagesToDelete = []
      uploadedTempImages.forEach((url) => {
        if (usedImages.includes(url)) {
          imagesToMove.push(url);
        } else {
          tempImagesToDelete.push(url);
        }
      });

      const res = await axios.post("/post/updatePost", {uid: uid, category: category, title: title, content: content, moveFile: imagesToMove, tempDeleteFile: tempImagesToDelete, deleteFile: imagesToDelete});
      if(res.data.code === '200'){
        uploadedTempImages.clear();
        navigate(`/`)
      }
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      uploadedTempImages.clear();
      navigate("/");
    }
  }

  const cancelUpdatePost = async () => {
    let response = await deleteTempImages()
    
    if(response.code === '200'){
      uploadedTempImages.clear();
      navigate(`/post/postDetail/${uid}`)
    }
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
        config={{
            toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'imageUpload'],
            removePlugins: ['MediaEmbed', 'HtmlEmbed', 'Iframe'],
            extraPlugins: [MyCustomUploadAdapterPlugin] 
        }}
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