import React, { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { Outlet } from 'react-router-dom';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { useNavigate, useParams } from "react-router-dom";

const GroupLayout = () => {
  const { userInfo, setUserInfo, groupList, setGroupList, groupInfo, setGroupInfo } = useGroup();    
  const { groupUid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMain = async () => {
      try {
        let userInfoRes = userInfo
        
        if(!userInfo){
          let response = await axios.get("/getUserInfo");
          userInfoRes = response.data
          setUserInfo(userInfoRes)
        }

        if(!groupList || groupList.length == 0){
          const response = await axios.post("/group/getGroupList", {uid: userInfoRes.uid});
          setGroupList(response.data)
        }

        const res = await axios.post("/group/getGroupInfo", {groupUid: groupUid, userUid: userInfoRes.uid});
        if(res.data.status === 'success'){
          setGroupInfo(res.data.result)
          if (userInfoRes.auth !== res.data.result.auth) {
            setUserInfo({ ...userInfoRes, auth: res.data.result.auth });
          }
        }else{
          alert(res.data.message);
          navigate(routes.groupList());
        }
      } catch (err) {
        alert("인증되지 않은 사용자입니다.");
        navigate(routes.groupList());
      }
    };

    if(groupUid){
      fetchMain();
    }
  }, [groupUid]);

  return (
    <Outlet />
  );
};

export default GroupLayout;