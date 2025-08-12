import React, { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { Outlet } from 'react-router-dom';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { useNavigate, useParams } from "react-router-dom";

const Layout = () => {
  const { userInfo, setUserInfo, groupList, setGroupList, groupInfo, setGroupInfo, categoryList, setCategoryList } = useGroup();    
  const { groupUid, category1Uid, category2Uid } = useParams();

  const [selectedCategory, setSelectedCategory] = useState({ parent: null, child: null });

  const navigate = useNavigate();


  useEffect(() => {
    if (category1Uid) {
      setSelectedCategory({
        parent: Number(category1Uid),
        child: Number(category2Uid) || 0
      });
    } else {
      setSelectedCategory({ parent: null, child: null });
    }
  }, [category1Uid, category2Uid]);

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const res = await axios.post("/setting/category/getCategoryList", {groupUid: groupUid});
        if(res.data.status === 'success') {
            setCategoryList(res.data.list)
        }else{
            alert(res.data.message);
        }
      } catch (err) {
          console.error("데이터 가져오기 실패", err);
      }
    }

    getCategoryList()
  }, [])

  const goGroup = (groupUid) => {
    navigate(routes.main(groupUid))
  }

  const goPostList = (category1Uid, category2Uid) => {

    navigate(routes.postList(groupUid, category1Uid, category2Uid))
  }

  const goSetting = () => {
    navigate(routes.profile(groupUid))
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
            <div className='menu'>
              {categoryList.map((parent) => (
                <div key={parent.uid}>
                  <div className={`parentCategory ${selectedCategory.parent === parent.uid && selectedCategory.child === 0 ? 'on' : ''}`} onClick={() => goPostList(parent.uid, 0)}>{parent.name}</div>
                  {parent.categoryList.map((child) => (
                    <div key={child.uid} className={`childCategory ${selectedCategory.parent === parent.uid && selectedCategory.child === child.uid ? 'on' : ''}`} onClick={() => goPostList(parent.uid, child.uid)}>{child.name}</div>
                  ))}
                </div>
              ))}
              <div>
                <div className={`parentCategory ${!category1Uid && window.location.pathname.includes('/setting') ? 'on' : ''}`} onClick={() => goSetting()}>Setting</div>
              </div>
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

export default Layout;