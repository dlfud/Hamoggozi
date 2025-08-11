import React, { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { useNavigate, useParams } from "react-router-dom";
import { MyCustomUploadAdapterPlugin, extractTempImages
        , uploadedTempImages, deleteTempImages } from '../../util/UploadPostFileUtil';

const InsertPost = ({}) => {
  const { userInfo, groupInfo, categoryList } = useGroup();    
  const [category, setCategory] = useState(categoryList[0]?.uid)
  const [subCategory, setSubCategory] = useState()
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryList.length > 0) {
      const firstCategoryUid = categoryList[0].uid;
      setCategory(firstCategoryUid);
      setSubCategory("0");
    }
  }, [categoryList]);

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

      const res = await axios.post("/post/insertPost", {groupUid: groupInfo.uid, category1Uid: Number(category), category2Uid: Number(subCategory), title: title, content: content, moveFile: imagesToMove, tempDeleteFile: imagesToDelete});
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

  const changeCategorySelect = (e) => {
    const selected = Number(e.target.value);
    setCategory(selected);
    setSubCategory("0");
  }

  return (
    <div>
      <div className="menuBtns">
        <div></div>
        <div>
          <button className="postMenuBtn mr10" onClick={insertPost}>저장하기</button>
          <button className="postMenuBtn" onClick={cancelInsertPost}>취소</button>
        </div>
      </div>

      <div className="updateTitle">
        <p>Title</p>
        <input type="text" id="title" onChange={(e) => setTitle(e.target.value)}></input>
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

export default InsertPost;