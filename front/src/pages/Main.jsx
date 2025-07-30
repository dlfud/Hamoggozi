import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useGroup } from '../util/GroupContext';
import { routes } from '../util/Route'; 
import { useNavigate, useParams } from "react-router-dom";

const Main = () => {
  const { userInfo, groupInfo } = useGroup();    
  const { groupUid } = useParams();

  const [isSettingNotice, setIsSettingNotice] = useState(false)
  const [isEditingNotice, setIsEditingNotice] = useState(false);
  const [noticeUid, setNoticeUid] = useState()
  const [noticeContent, setNoticeContent] = useState('내용을 입력해 주세요.')
  
  const [postList, setPostList] = useState([]);
  const [category, setCategory] = useState('All')
  const [searchWord, setSearchWord] = useState()
  const [searchCount, setSearchCount] = useState(10)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState()
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!groupInfo) return;
    if(groupInfo.auth === "MANAGER"){
      setIsSettingNotice(true)
    }else{
      setIsSettingNotice(false)
    }

    getNotice();
    getPostList(1);
  }, [groupInfo]);

  //notice
  const getNotice = async () => {
    try {
      const res = await axios.post("/notice/getNotice", {groupUid: groupUid});
      setNoticeUid(res.data.uid)
      setNoticeContent(res.data.content);
    } catch (err) {
      console.error("데이터 가져오기 실패", err);
    }
  }

  const updateNotice = async () => {
    setIsEditingNotice(true)
  }

  const saveNotice = async () => {
    setIsEditingNotice(false)

     try {
      const res = await axios.post("/notice/saveNotice", {userUid: userInfo.uid, uid: noticeUid, groupUid: groupInfo.uid, content: noticeContent});
      if(res.data.status === 'success') {
        getNotice()
      }else{
        alert(res.data.message);
      }
    } catch (err) {
      console.error("공지 업데이트 실패", err);
    }
  }

  const cancelNotice = () => {
    setIsEditingNotice(false)
    getNotice()
  }

  //post
  useEffect(() => {
    getPostList(1);
  }, [searchCount]);

  const getPostList = async (page) => {
    try {
      setCurrentPage(page)
      let offset = (page - 1) * searchCount
      const res = await axios.post("/post/getPostList", {userUid: userInfo.uid, groupUid: groupInfo.uid, category: category, searchWord: searchWord, searchCount: searchCount, offset: offset});
      setPostList(res.data.postList);
      setTotalCount(res.data.totalCnt)
    } catch (err) {
      console.error("데이터 가져오기 실패", err);
    }
  }

  const goPostDetail = (postUid) => {
    navigate(routes.postDetail(groupInfo.uid, postUid))
  }

   const insertPost = () => {
    navigate(routes.postInsert(groupInfo.uid))
  }

  return (
    <div>
      <div className="noticeDiv">
        <div className="noticeHeader">
          <h3 className="mb10">NOTICE</h3>
          {isSettingNotice && (
            <>
              {!isEditingNotice && (
                <div className="cursorPointer" onClick={() => updateNotice()}>
                  <svg width="27" height="27" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99266 2.52337C10.3563 2.24523 10.8153 2.12228 11.2693 2.18137C11.466 2.20804 11.644 2.2767 11.8213 2.3627C11.9907 2.44604 12.188 2.56004 12.424 2.69604L12.4527 2.7127C12.688 2.84804 12.886 2.9627 13.0427 3.06804C13.206 3.17737 13.3553 3.2967 13.476 3.4547C13.7553 3.81804 13.8787 4.2767 13.8187 4.7307C13.7883 4.92335 13.7268 5.10978 13.6367 5.2827C13.554 5.45204 13.4393 5.64937 13.3033 5.8847L9.88599 11.798C9.67005 12.1904 9.34397 12.5109 8.94799 12.72L7.70732 13.408C7.48732 13.53 7.29399 13.6374 7.12999 13.7094C6.96332 13.7827 6.75666 13.8534 6.52599 13.828C6.37341 13.811 6.226 13.7626 6.09303 13.6858C5.96006 13.6091 5.8444 13.5056 5.75332 13.382C5.61532 13.1954 5.57332 12.9807 5.55332 12.7994C5.53564 12.5834 5.52675 12.3668 5.52666 12.15L5.50266 10.732C5.4855 10.2847 5.60001 9.84221 5.83199 9.45937L9.24999 3.54604C9.38532 3.3107 9.49999 3.1127 9.60532 2.95604C9.71532 2.7927 9.83466 2.64404 9.99199 2.5227M11.138 3.17204C10.9467 3.14742 10.7534 3.19916 10.6 3.31604C10.5647 3.34337 10.5153 3.3927 10.434 3.51404C10.339 3.66082 10.2486 3.81045 10.1627 3.9627L10.1773 3.96804C10.4333 4.06804 10.816 4.24537 11.364 4.56137C11.9047 4.87337 12.2433 5.1427 12.4547 5.3527C12.5867 5.1247 12.676 4.9687 12.738 4.84204C12.802 4.7107 12.8207 4.64404 12.8267 4.59937C12.8507 4.40874 12.799 4.21627 12.6827 4.06337C12.6553 4.02737 12.606 3.9787 12.4847 3.8967C12.3057 3.7824 12.1234 3.67346 11.938 3.57004C11.6847 3.42337 11.516 3.3267 11.3807 3.2607C11.2493 3.1967 11.1827 3.17804 11.138 3.17204ZM11.8687 6.18537L11.8693 6.18737L11.8707 6.1907L11.8727 6.19604L11.8773 6.20537L11.8827 6.21604L11.8813 6.21404L11.8687 6.18537ZM11.9187 6.28004C11.9034 6.25692 11.8896 6.23287 11.8773 6.20804C11.8438 6.16135 11.8063 6.11763 11.7653 6.07737C11.632 5.94204 11.3653 5.71737 10.864 5.42737C10.3493 5.1307 10.012 4.97737 9.81332 4.89937C9.76083 4.8788 9.70769 4.8599 9.65399 4.8427L6.69732 9.95937C6.55631 10.1849 6.4879 10.4484 6.50132 10.714L6.52532 12.11C6.52999 12.39 6.53332 12.5647 6.54666 12.6907C6.55332 12.7534 6.56132 12.7854 6.56532 12.7974C6.58095 12.8144 6.60142 12.8263 6.62399 12.8314C6.65918 12.8218 6.69351 12.8093 6.72666 12.794C6.84266 12.7427 6.99599 12.658 7.23999 12.5227L8.46266 11.8447C8.69981 11.7238 8.89412 11.533 9.01932 11.298L11.9187 6.28004ZM10.5973 5.8887C10.6542 5.92156 10.704 5.96531 10.744 6.01744C10.784 6.06957 10.8133 6.12906 10.8302 6.19252C10.8472 6.25598 10.8515 6.32216 10.8429 6.38728C10.8343 6.4524 10.8129 6.51518 10.78 6.57204L8.50199 10.514C8.4694 10.5714 8.42579 10.6217 8.37368 10.6621C8.32156 10.7025 8.26197 10.7322 8.19834 10.7494C8.1347 10.7667 8.06828 10.7712 8.00289 10.7627C7.9375 10.7542 7.87443 10.7329 7.81733 10.6999C7.76022 10.6669 7.7102 10.623 7.67015 10.5706C7.63009 10.5182 7.6008 10.4585 7.58394 10.3947C7.56709 10.331 7.56301 10.2645 7.57194 10.1992C7.58087 10.1338 7.60264 10.0709 7.63599 10.014L9.91466 6.07137C9.98102 5.95668 10.0902 5.87302 10.2182 5.83877C10.3462 5.80452 10.4826 5.82248 10.5973 5.8887Z" fill="#1E1E1E"/>
                  <path opacity="0.5" d="M6.33332 12C6.61093 12 6.88161 12.0867 7.1076 12.2479C7.33359 12.4091 7.50363 12.6368 7.59399 12.8993L7.48399 12.96C7.34977 13.0351 7.23266 13.0991 7.13266 13.152C7.15488 13.2084 7.16621 13.2689 7.16666 13.3333C7.16666 13.4659 7.11398 13.5931 7.02021 13.6869C6.92644 13.7807 6.79926 13.8333 6.66666 13.8333H2.66666C2.53405 13.8333 2.40687 13.7807 2.3131 13.6869C2.21933 13.5931 2.16666 13.4659 2.16666 13.3333C2.16666 13.2007 2.21933 13.0735 2.3131 12.9798C2.40687 12.886 2.53405 12.8333 2.66666 12.8333H6.06266C6.03532 12.67 6.03132 12.4433 6.02599 12.1193L6.02466 12.036C6.12579 12.012 6.22938 11.9999 6.33332 12Z" fill="#1E1E1E"/>
                  </svg>
                </div>
              )}
              {isEditingNotice && (
                <>
                  <div className="flex">
                    <div className="cursorPointer mr10" onClick={() => saveNotice()}>
                      <svg width="27" height="27" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.28332 9.36667L11.0667 5.6L10.1167 4.65L7.28332 7.48333L5.86666 6.06667L4.93332 7L7.28332 9.36667ZM0.666656 14V12.6667H15.3333V14H0.666656ZM2.66666 12C2.29999 12 1.98621 11.8696 1.72532 11.6087C1.46443 11.3478 1.33377 11.0338 1.33332 10.6667V3.33333C1.33332 2.96667 1.46399 2.65289 1.72532 2.392C1.98666 2.13111 2.30043 2.00044 2.66666 2H13.3333C13.7 2 14.014 2.13067 14.2753 2.392C14.5367 2.65333 14.6671 2.96711 14.6667 3.33333V10.6667C14.6667 11.0333 14.5362 11.3473 14.2753 11.6087C14.0144 11.87 13.7004 12.0004 13.3333 12H2.66666ZM2.66666 10.6667H13.3333V3.33333H2.66666V10.6667Z" fill="#1E1E1E"/>
                      </svg>
                    </div>
                    <div className="cursorPointer" onClick={() => cancelNotice()}>
                      <svg width="27" height="27" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.99998 8.93337L9.93331 10.8667C10.0555 10.9889 10.2111 11.05 10.4 11.05C10.5889 11.05 10.7444 10.9889 10.8666 10.8667C10.9889 10.7445 11.05 10.5889 11.05 10.4C11.05 10.2112 10.9889 10.0556 10.8666 9.93337L8.93331 8.00004L10.8666 6.06671C10.9889 5.94449 11.05 5.78893 11.05 5.60004C11.05 5.41115 10.9889 5.2556 10.8666 5.13337C10.7444 5.01115 10.5889 4.95004 10.4 4.95004C10.2111 4.95004 10.0555 5.01115 9.93331 5.13337L7.99998 7.06671L6.06665 5.13337C5.94443 5.01115 5.78887 4.95004 5.59998 4.95004C5.41109 4.95004 5.25554 5.01115 5.13331 5.13337C5.01109 5.2556 4.94998 5.41115 4.94998 5.60004C4.94998 5.78893 5.01109 5.94449 5.13331 6.06671L7.06665 8.00004L5.13331 9.93337C5.01109 10.0556 4.94998 10.2112 4.94998 10.4C4.94998 10.5889 5.01109 10.7445 5.13331 10.8667C5.25554 10.9889 5.41109 11.05 5.59998 11.05C5.78887 11.05 5.94443 10.9889 6.06665 10.8667L7.99998 8.93337ZM7.99998 14.6667C7.07776 14.6667 6.21109 14.4916 5.39998 14.1414C4.58887 13.7912 3.88331 13.3163 3.28331 12.7167C2.68331 12.1172 2.20843 11.4116 1.85865 10.6C1.50887 9.78849 1.33376 8.92182 1.33331 8.00004C1.33287 7.07826 1.50798 6.2116 1.85865 5.40004C2.20931 4.58849 2.6842 3.88293 3.28331 3.28337C3.88243 2.68382 4.58798 2.20893 5.39998 1.85871C6.21198 1.50849 7.07865 1.33337 7.99998 1.33337C8.92131 1.33337 9.78798 1.50849 10.6 1.85871C11.412 2.20893 12.1175 2.68382 12.7166 3.28337C13.3158 3.88293 13.7909 4.58849 14.142 5.40004C14.4931 6.2116 14.668 7.07826 14.6666 8.00004C14.6653 8.92182 14.4902 9.78849 14.1413 10.6C13.7924 11.4116 13.3175 12.1172 12.7166 12.7167C12.1158 13.3163 11.4102 13.7914 10.6 14.142C9.78976 14.4927 8.92309 14.6676 7.99998 14.6667ZM7.99998 13.3334C9.48887 13.3334 10.75 12.8167 11.7833 11.7834C12.8166 10.75 13.3333 9.48893 13.3333 8.00004C13.3333 6.51115 12.8166 5.25004 11.7833 4.21671C10.75 3.18337 9.48887 2.66671 7.99998 2.66671C6.51109 2.66671 5.24998 3.18337 4.21665 4.21671C3.18331 5.25004 2.66665 6.51115 2.66665 8.00004C2.66665 9.48893 3.18331 10.75 4.21665 11.7834C5.24998 12.8167 6.51109 13.3334 7.99998 13.3334Z" fill="#1E1E1E"/>
                      </svg>
                    </div>
                  </div>
                </>
              )}  
            </>
          )}          
        </div>
        
        <div className="noticeContent">
          {!isEditingNotice && (
            <div>{noticeContent ? noticeContent : '내용을 입력해 주세요.'}</div>
          )}
          {isEditingNotice && (
            <textarea className="noticeInput" type="text" placeholder="내용을 입력해 주세요." onChange={(e) => setNoticeContent(e.target.value)} value={noticeContent ? noticeContent : '내용을 입력해 주세요.'}></textarea>
          )}
        </div>
      </div>

      <div className="searchDiv">
        <select className="search mr10" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">ALL</option>
          <option value="test1">test1</option>
          <option value="test2">test2</option>
          <option value="test3">test3</option>
        </select>
        <input className="search mr10" type="text" placeholder="Post" onChange={(e) => setSearchWord(e.target.value)}></input>
        <button className="searchBtn" onClick={getPostList}>
          <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.0667 14L8.86667 9.8C8.53333 10.0667 8.15 10.2778 7.71667 10.4333C7.28333 10.5889 6.82222 10.6667 6.33333 10.6667C5.12222 10.6667 4.09733 10.2471 3.25867 9.408C2.42 8.56889 2.00044 7.544 2 6.33333C1.99956 5.12267 2.41911 4.09778 3.25867 3.25867C4.09822 2.41956 5.12311 2 6.33333 2C7.54356 2 8.56867 2.41956 9.40867 3.25867C10.2487 4.09778 10.668 5.12267 10.6667 6.33333C10.6667 6.82222 10.5889 7.28333 10.4333 7.71667C10.2778 8.15 10.0667 8.53333 9.8 8.86667L14 13.0667L13.0667 14ZM6.33333 9.33333C7.16667 9.33333 7.87511 9.04178 8.45867 8.45867C9.04222 7.87556 9.33378 7.16711 9.33333 6.33333C9.33289 5.49956 9.04133 4.79133 8.45867 4.20867C7.876 3.626 7.16756 3.33422 6.33333 3.33333C5.49911 3.33244 4.79089 3.62422 4.20867 4.20867C3.62644 4.79311 3.33467 5.50133 3.33333 6.33333C3.332 7.16533 3.62378 7.87378 4.20867 8.45867C4.79356 9.04356 5.50178 9.33511 6.33333 9.33333Z" fill="#1E1E1E"/>
          </svg>
        </button>
        <select className="rowCountSelect" value={searchCount} onChange={(e) => { setSearchCount(Number(e.target.value)) }}>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      
      <div className="postMenu">
        <button className="postMenuBtn" onClick={insertPost}>글쓰기</button>
      </div>
      <div className="postDiv">
        <table border="1">
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>UID</th>
              <th>제목</th>
              <th>category</th>
              <th>updateTime</th>
            </tr>
          </thead>
          <tbody>
            {postList.map(item => (
              <tr key={item.uid}>
                <td className="textCenter">{item.uid}</td>
                <td className="cursorPointer" onClick={() => goPostDetail(item.uid)}>{item.title}</td>
                <td className="textCenter">{item.category}</td>
                <td className="textCenter">{item.updateDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paging textCenter">
        {Array.from({ length: Math.ceil(totalCount / searchCount) }, (_, i) => (
          <button
            key={i}
            onClick={() => getPostList(i + 1)}
            className={`pageBtn${currentPage === i + 1 ? " active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Main;
