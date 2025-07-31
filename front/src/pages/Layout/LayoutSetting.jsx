import React, { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { Outlet } from 'react-router-dom';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { useNavigate, useParams } from "react-router-dom";

const LayoutSetting = () => {
  const { userInfo, setUserInfo, groupList, setGroupList, groupInfo, setGroupInfo } = useGroup();    
  const { groupUid } = useParams();
  const navigate = useNavigate();

  const [isCategorySetting, setIsCategorySetting] = useState(false)

  useEffect(() => {
    if (!groupInfo) return; 
    try {
      if(groupInfo.auth === 'MANAGER'){
        setIsCategorySetting(true)
      }else{
        setIsCategorySetting(false)
      }
    } catch (err) {
      alert("인증되지 않은 사용자입니다.");
      navigate(routes.groupList());
    }
  }, [groupInfo]);

  const move = (param) => {
    if (param === "profile") {
      navigate(routes.profile(groupUid));
    } else if (param === "category") {
      navigate(routes.category(groupUid));
    } else if (param === 'main'){
      navigate(routes.main(groupUid));
    }
  }

  return (
    <div className='container'>
      <div className='content'>
        <div className='main'>
          <div className='left'>
            <div className='menu'>
              <button onClick={() => move('profile')}>profile</button>
              {isCategorySetting && (
                <button onClick={() => move('category')}>Category</button>
              )}

              <button onClick={() => move('main')}>나가기</button>
            </div>
          </div>

          <div className='right'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default LayoutSetting;