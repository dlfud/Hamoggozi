import React, { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { useNavigate, useParams } from "react-router-dom";
import { MyCustomUploadAdapterPlugin, extractTempImages
        , uploadedTempImages, deleteTempImages } from '../../util/UploadPostFileUtil';

const InsertPost = ({ defaultCategory = 'ALL' }) => {
  const { userInfo, groupInfo } = useGroup();    
  const [category, setCategory] = useState()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const navigate = useNavigate();

  useEffect(() => {
      setCategory(defaultCategory);
  }, [defaultCategory]);

  const insertPost = async () => {
    try {
      const usedTempImages = extractTempImages(content);

      const imagesToMove = [];
      const imagesToDelete = [];

      uploadedTempImages.forEach((url) => {
        if (usedTempImages.includes(url)) {
          imagesToMove.push(url);
        } else {
          imagesToDelete.push(url);
        }
      });

      const res = await axios.post("/post/insertPost", {groupUid: groupInfo.uid, category: category, title: title, content: content, moveFile: imagesToMove, tempDeleteFile: imagesToDelete});
      if(res.data.status === 'success'){
        uploadedTempImages.clear();
        navigate(routes.main(groupInfo.uid))
      }else{
        alert(res.data.message)
      }
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      uploadedTempImages.clear();
      navigate(routes.groupList());
    }
  }

  const cancelInsertPost = async () => {
    let response = await deleteTempImages()

    if(response.code === '200'){
      uploadedTempImages.clear();
      navigate(routes.main(groupInfo.uid))
    }
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
              extraPlugins: [MyCustomUploadAdapterPlugin] 
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