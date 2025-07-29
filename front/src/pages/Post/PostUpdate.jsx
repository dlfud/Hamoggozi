import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactMarkdown from 'react-markdown';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { marked } from 'marked';
import { useNavigate, useParams } from "react-router-dom";
import { MyCustomUploadAdapterPlugin, extractTempImages
        , uploadedTempImages, deleteTempImages, 
        extractImages} from '../../util/UploadPostFileUtil';

const UpdatePost = ({ defaultCategory = 'ALL' }) => {
  const { userInfo, groupInfo } = useGroup();    
  const { groupUid, postUid } = useParams();
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
        const res = await axios.post("/post/getPostDetail", {uid: postUid, groupUid: groupInfo.uid});
        if(res.data.status === 'success'){
          const convertedContent = marked(res.data.result.content);
          setPostData({ ...res.data.result, content: convertedContent });

          const imgTags = extractImages(convertedContent);
          setInitialImages(imgTags);
        }else{
          alert(res.data.message)
        }
      } catch (err) {
        alert("인증되지 않은 사용자입니다.");
        navigate(routes.groupList());
      }
    };

    fetchPost();
  }, [postUid]);

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

      const res = await axios.post("/post/updatePost", {uid: postUid, groupUid: groupInfo.uid, category: category, title: title, content: content, moveFile: imagesToMove, tempDeleteFile: tempImagesToDelete, deleteFile: imagesToDelete});
      if(res.data.status === 'success'){
        uploadedTempImages.clear();
        navigate(routes.main(groupInfo.uid));
      }else{
        alert(res.data.message)
        navigate(routes.main(groupInfo.uid));
      }
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      uploadedTempImages.clear();
      navigate(routes.groupList());
    }
  }

  const cancelUpdatePost = async () => {
    let response = await deleteTempImages()
    
    if(response.code === '200'){
      uploadedTempImages.clear();
      navigate(routes.postDetail(groupInfo.uid, postUid))
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
      <p>UID: {postUid}</p>
    </div>
  );
};

export default UpdatePost;