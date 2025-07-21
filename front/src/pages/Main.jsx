import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [userInfo, setUserInfo] = useState()
  const [postList, setPostList] = useState([]);
  const [oneDiaryList, setOneDiaryList] = useState([])
  const [oneDiaryContent, setOneDiaryContent] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMain = async () => {
      try {
        const res = await axios.get("/main"); // 토큰 자동 첨부됨'
        setUserInfo(res.data)
      } catch (err) {
        alert("인증되지 않은 사용자입니다.");
        navigate("/");
      }
    };

    fetchMain();
  }, [navigate]);

  //user정보를 받고, postList, ondDiaryList 호출
  useEffect(() => {
    if (userInfo) {
      getPostList();
      getOneDiaryList();
    }
  }, [userInfo]);

  const getPostList = async () => {
    try {
      const res = await axios.post("/post/getPostList", {userUid: userInfo.uid});
      setPostList(res.data);
    } catch (err) {
      console.error("데이터 가져오기 실패", err);
    }
  }

  const getOneDiaryList = async () => {
    try {
      const res = await axios.post("/oneDiary/getOneDiaryList", {userUid: userInfo.uid});
      setOneDiaryList(res.data);
    } catch (err) {
      console.error("데이터 가져오기 실패", err);
    }
  }

  const goPostDetail = (postUid) => {
    navigate(`/post/postDetail/${postUid}`)
  }

   const insertPost = () => {
    navigate("/post/postInsertPage")
  }

  const saveOneDiary = async () => {
    try {
      const res = await axios.post("/oneDiary/saveOneDiary", {userUid: userInfo.uid, content: oneDiaryContent});
      console.log(res.data)
    } catch (err) {
      console.error("권한 없음", err);
    }
  }

  return (
    <div>
      <div className="searchDiv">
        <select className="search mr10">
          <option value="All">ALL</option>
        </select>
        <input className="search" type="text" placeholder="Post"></input>
        <select className="rowCountSelect">
          <option value="10">10</option>
        </select>
      </div>
      
      <div className="postMenu">
        <button className="postMenuBtn" onClick={insertPost}>글쓰기</button>
      </div>
      <div className="postDiv">
        <table border="1">
          <thead>
            <tr>
              <th>UID</th>
              <th>제목</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {postList.map(item => (
              <tr key={item.uid}>
                <td>{item.uid}</td>
                <td onClick={() => goPostDetail(item.uid)}>{item.title}</td>
                <td>{item.updateDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="oneDiaryDiv">
        <div className="oneDiaryList scrollbox">
          {oneDiaryList.map(item => (
            <div className="oneDiaryInfo" key={item.uid}>
              <div className="oneDiaryInfoDiv">
                <div className="oneDiaryUser mr10">{item.userName}</div>
                <div className="oneDiaryContent">{item.content}</div>
                <div className="cursorPointer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.0927 8.24983L13.9854 9.04479C14.1503 9.18236 14.2604 9.37441 14.2959 9.58617C14.3315 9.79792 14.29 10.0154 14.179 10.1992L13.1026 12.038C13.0191 12.1788 12.8998 12.2949 12.7569 12.3747C12.6124 12.4547 12.4501 12.4972 12.2849 12.4982C12.1824 12.4988 12.0805 12.4835 11.9827 12.4528L10.8401 12.0755C10.64 12.2039 10.432 12.3188 10.216 12.4202L9.97606 13.5785C9.93165 13.7916 9.81301 13.982 9.64128 14.1158C9.46739 14.2519 9.25179 14.3238 9.03099 14.3192H6.80213C6.58133 14.3238 6.36574 14.2519 6.19184 14.1158C6.02048 13.9819 5.9022 13.7915 5.85805 13.5785L5.61709 12.4202C5.40398 12.3174 5.19722 12.202 4.99791 12.0745L3.85139 12.4528C3.75363 12.4835 3.65168 12.4988 3.5492 12.4982C3.38434 12.497 3.2224 12.4546 3.07815 12.3747C2.93539 12.2952 2.81616 12.1794 2.73251 12.039L1.61759 10.1992C1.50168 10.0137 1.45739 9.79236 1.49303 9.57656C1.52866 9.36077 1.64177 9.16538 1.81115 9.02701L2.70289 7.90024V7.55065L1.81016 6.75569C1.6453 6.61812 1.53515 6.42607 1.49965 6.21431C1.46414 6.00255 1.50563 5.78508 1.6166 5.60127L2.73153 3.76248C2.81504 3.62173 2.93428 3.50555 3.07716 3.42573C3.22141 3.34591 3.38336 3.30347 3.54821 3.30229C3.64977 3.29589 3.7517 3.30521 3.8504 3.32994L4.97421 3.72496C5.17501 3.59658 5.38305 3.48169 5.59833 3.38031L5.83929 2.22193C5.88344 2.00899 6.00172 1.81862 6.17307 1.68472C6.34697 1.54858 6.56257 1.47671 6.78337 1.48128H8.99346C9.21426 1.47671 9.42986 1.54858 9.60376 1.68472C9.77658 1.82001 9.89508 2.0106 9.93754 2.22193L10.1785 3.38031C10.3925 3.48235 10.5989 3.59756 10.7977 3.72594L11.9452 3.34871C12.0726 3.30728 12.2071 3.29273 12.3404 3.30599C12.4737 3.31925 12.6027 3.36002 12.7194 3.42573C12.8626 3.50671 12.9811 3.62324 13.0651 3.76149L14.179 5.60127C14.2965 5.78517 14.343 6.00553 14.3099 6.22122C14.2769 6.43692 14.1664 6.63321 13.9993 6.77347L13.0927 7.54572V8.24983Z" fill="#646464" stroke="white"/>
                  <path d="M10.3691 7.90023C10.3691 8.555 10.109 9.18296 9.64598 9.64595C9.18299 10.1089 8.55503 10.3691 7.90026 10.3691C7.24548 10.3691 6.61753 10.1089 6.15453 9.64595C5.69153 9.18296 5.43143 8.555 5.43143 7.90023C5.43143 7.24545 5.69153 6.61749 6.15453 6.1545C6.61753 5.6915 7.24548 5.4314 7.90026 5.4314C8.55503 5.4314 9.18299 5.6915 9.64598 6.1545C10.109 6.61749 10.3691 7.24545 10.3691 7.90023Z" stroke="white"/>
                  </svg>
                </div>
              </div>
              <div className="oneDiaryDateDiv">
                <div className="oneDiaryDate">{item.insertDate}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="oneDiaryInputBtn">
          <input className="oneDiaryInput" typ1e="text" onChange={(e) => setOneDiaryContent(e.target.value)}></input>
          <button className="oneDiarySendBtn" onClick={saveOneDiary}>보내기</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
