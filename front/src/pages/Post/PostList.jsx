import React, { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { useNavigate, useParams } from "react-router-dom";

const PostList = ({}) => {
    const { userInfo, groupInfo, categoryList } = useGroup();
    const { groupUid, category1Uid, category2Uid } = useParams();

    const [ postList, setPostList] = useState([]) 
    const [searchWord, setSearchWord] = useState()
    const [searchCount, setSearchCount] = useState(10)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        if(!groupInfo) return

        getPostList(1);
    }, [groupInfo, searchCount, category1Uid, category2Uid])

    const getPostList = async (page) => {
        try {
            setCurrentPage(page)
            let offset = (page - 1) * searchCount
            const res = await axios.post("/post/getPostList", {userUid: userInfo.uid, groupUid: groupUid, category1Uid: Number(category1Uid), category2Uid: Number(category2Uid), searchWord: searchWord, searchCount: searchCount, offset: offset});
            setPostList(res.data.postList);
            setTotalCount(res.data.totalCnt)
        } catch (err) {
            console.error("데이터 가져오기 실패", err);
        }
    }

    const goPostDetail = (postUid) => {
        navigate(routes.postDetail(groupInfo.uid, postUid))
      }


    return (
        <div className='container'>
            <div className="searchDiv">
                <input className="search mr10" type="text" placeholder="Post" onChange={(e) => setSearchWord(e.target.value)}></input>
                <button className="searchBtn" onClick={() => getPostList()}>
                    <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0667 14L8.86667 9.8C8.53333 10.0667 8.15 10.2778 7.71667 10.4333C7.28333 10.5889 6.82222 10.6667 6.33333 10.6667C5.12222 10.6667 4.09733 10.2471 3.25867 9.408C2.42 8.56889 2.00044 7.544 2 6.33333C1.99956 5.12267 2.41911 4.09778 3.25867 3.25867C4.09822 2.41956 5.12311 2 6.33333 2C7.54356 2 8.56867 2.41956 9.40867 3.25867C10.2487 4.09778 10.668 5.12267 10.6667 6.33333C10.6667 6.82222 10.5889 7.28333 10.4333 7.71667C10.2778 8.15 10.0667 8.53333 9.8 8.86667L14 13.0667L13.0667 14ZM6.33333 9.33333C7.16667 9.33333 7.87511 9.04178 8.45867 8.45867C9.04222 7.87556 9.33378 7.16711 9.33333 6.33333C9.33289 5.49956 9.04133 4.79133 8.45867 4.20867C7.876 3.626 7.16756 3.33422 6.33333 3.33333C5.49911 3.33244 4.79089 3.62422 4.20867 4.20867C3.62644 4.79311 3.33467 5.50133 3.33333 6.33333C3.332 7.16533 3.62378 7.87378 4.20867 8.45867C4.79356 9.04356 5.50178 9.33511 6.33333 9.33333Z" fill="#1E1E1E"/>
                    </svg>
                </button>
            </div>

            <div className="postMenu">
                <div></div>
                <select className="rowCountSelect" value={searchCount} onChange={(e) => { setSearchCount(Number(e.target.value)) }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div className="postListDiv">
                <table border="1">
                    <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '30%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                        <th>UID</th>
                        <th>제목</th>
                        <th>category</th>
                        <th>subCategory</th>
                        <th>updateTime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postList.map(item => {
                            let c = categoryList.find(cat => cat.uid === Number(item.category1Uid))
                            let sc
                            if(c.categoryList.length !== 0){
                                sc = c.categoryList.find(cat => cat.uid === Number(item.category2Uid))
                            }
                            return (
                                <tr key={item.uid}>
                                    <td className="textCenter">{item.uid}</td>
                                    <td className="cursorPointer" onClick={() => goPostDetail(item.uid)}>{item.title}</td>
                                    <td className="textCenter">{c.name}</td>
                                    <td className="textCenter">{sc?.name}</td>
                                    <td className="textCenter">{item.updateDate}</td>
                                </tr>
                            )
                        })}
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
}

export default PostList;