import React, { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { Outlet } from 'react-router-dom';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { useNavigate, useParams } from "react-router-dom";

const Layout = () => {
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

  const goGroup = (groupUid) => {
    navigate(routes.main(groupUid))
  }
  
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <div className='container'>
      <div className='headerContent mb10'>
        <div className="headerBackgroundOverlay"></div>
        <div className='headerBackgroundImg'></div>
        <div className='headerGroup'>
          {groupList.map(item => {
            return (
              <div key={item.uid} className="headerGroupButton mr10" onClick={() => goGroup(item.uid)}>
                {item.groupName}
              </div>
            )
          })}
          <div className='logoutBtn' onClick={handleLogout}>
            <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33333 14C2.96667 14 2.65289 13.8696 2.392 13.6087C2.13111 13.3478 2.00044 13.0338 2 12.6667V3.33333C2 2.96667 2.13067 2.65289 2.392 2.392C2.65333 2.13111 2.96711 2.00044 3.33333 2H8V3.33333H3.33333V12.6667H8V14H3.33333ZM10.6667 11.3333L9.75 10.3667L11.45 8.66667H6V7.33333H11.45L9.75 5.63333L10.6667 4.66667L14 8L10.6667 11.3333Z" fill="#1E1E1E"/>
            </svg>
          </div>
        </div>
        <div className='profileDiv'>
          <div className='profileImg'></div>
          <div>
            <div>{userInfo?.name}</div>
            <div>{userInfo?.id}</div>
            <div className='profileInfoAuth'>
              <div className='mr10'>{userInfo?.auth}</div>
              <div className='profileAuthImg'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='content'>
        <div className='main'>
          <div className='left'>
            <div className='calendar'>달력</div>
            <div className='menu'>메뉴</div>
          </div>

          <div className='right'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;