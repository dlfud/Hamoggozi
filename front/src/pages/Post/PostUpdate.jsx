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

const UpdatePost = () => {
  const { userInfo, groupInfo, categoryList } = useGroup();    
  const { groupUid, postUid } = useParams();

  const [postData, setPostData] = useState({})

  const [category, setCategory] = useState()
  const [subCategory, setSubCategory] = useState()

  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [initialImages, setInitialImages] = useState([])

  const navigate = useNavigate();

  const changeCategorySelect = (e) => {
    const selected = e.target.value;
    setCategory(Number(selected));
    setSubCategory("0");
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.post("/post/getPostDetail", {uid: postUid, groupUid: groupUid});
        if(res.data.status === 'success'){
          const convertedContent = marked(res.data.result.content);
          setPostData({ ...res.data.result, content: convertedContent });

          setCategory(Number(res.data.result.category1Uid))
          setSubCategory(Number(res.data.result.category2Uid))

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

      const res = await axios.post("/post/updatePost", {uid: postUid, groupUid: groupInfo.uid, category1Uid: Number(category), category2Uid: Number(subCategory), title: title, content: content, moveFile: imagesToMove, tempDeleteFile: tempImagesToDelete, deleteFile: imagesToDelete});
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
      <div className="menuBtns">
        <div></div>
        <div>
          <button className="postMenuBtn mr10" onClick={updatePost}>수정하기</button>
          <button className="postMenuBtn" onClick={cancelUpdatePost}>취소</button>
        </div>
      </div>

      <div className="updateTitle">
        <p>Title</p>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>

      <div className="selectCategories">
        <div className="selectCategory">
          <p className="mr10">Category</p>
          <select className="search mr10" value={category} onChange={(e) => changeCategorySelect(e)}>
            {categoryList.map((parent) => (
              <option key={parent.uid} value={parent.uid}>{parent.name}</option>
            ))}
          </select>
        </div>
        <div className="selectCategory">
          <p className="mr10">Sub Category</p>
          <select className="search mr10" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option value="0">-</option>
            {(categoryList.find(p => p.uid === category)?.categoryList || []).map((child) => (
              <option key={child.uid} value={child.uid}>{child.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="updateContent">
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
      </div>
    </div>
  );
};

export default UpdatePost;