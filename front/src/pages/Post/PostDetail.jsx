import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import ReactMarkdown from 'react-markdown';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const { userInfo, groupInfo } = useGroup();    
  const { groupUid, postUid } = useParams();
  const [postData, setPostData] = useState({})
  const [markdown, setMarkdown] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(!groupInfo || !userInfo) return
    getPostDetail()
  }, [groupInfo?.uid, userInfo?.uid, postUid]);

  const getPostDetail = async () => {
    try {
      const res = await axios.post("/post/getPostDetail", {uid: postUid, groupUid: groupUid, userUid: userInfo.uid});
      if(res.data.status === 'success'){
        setPostData(res.data.result)
      }else{
        alert(res.data.message)
        navigate(routes.main(groupUid));
      }
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      navigate(routes.groupList());
    }
  }

  const goPostList = () => {
    navigate(routes.main(groupUid));
  }

  const updatePost = () => {
    navigate(routes.postUpdate(groupUid, postUid))
  }

  const deletePost = async () => {
    try {
      const res = await axios.post("/post/deletePost", {uid: postUid});
      if(res.data.status == 'success'){
        alert("삭제 되었습니다.")
        navigate(routes.main(groupInfo.uid));
      }else{
        alert(res.data.message)
      }
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      navigate(routes.groupList());
    }
  }

  return (
    <div>
      <h2>상세 페이지</h2>
      <button onClick={goPostList}>목록으로</button>
      <button onClick={deletePost}>삭제</button>
      <button onClick={updatePost}>수정하기</button>
      <p>UID: {postUid}</p>
      <p>TITLE: {postData.title}</p>
      <p>CONTENT: </p><ReactMarkdown>{postData.content}</ReactMarkdown>
      <p>userName: {postData.userName}</p>
      <p>updateDate: {postData.updateDate}</p>
    </div>
  );
};

export default PostDetail;