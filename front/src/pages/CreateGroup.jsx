import React, { useEffect, useState } from "react";
import axios from "../api/axios"; 
import { routes } from '../util/Route'; 
import { useNavigate } from "react-router-dom";
import { useGroup } from '../util/GroupContext';
import '../Common.css';
import '../App.css';

const CreateGroup = () => {
    const { userInfo } = useGroup();  
    const [groupId, setGroupId] = useState("");
    const [groupName, setGroupName] = useState("");
    const navigate = useNavigate();

    const createGroup = async() => {
        try {
            const response = await axios.post('/group/insertGroup', {groupId: groupId, groupName: groupName, insertBy: userInfo.uid, updateBy: userInfo.uid});

            alert(response.data); 
            navigate(routes.groupList())
        } catch (error) {
            console.error(error);
            alert('그룹 생성 실패');
        }
    }

    const goBack = () => {
        navigate(routes.groupList())
    }

  return (
    <div className="container">
        <div className="content">
            <h2 className="loginLogo">
            <div className="loginLogoText">HAMO</div>
            </h2>
            <div className="loginContent">
                <div className='joinInputContent'>
                    <label className='joinLabel'>GroupId: </label>
                    <input className='joinInput' type="text" value={groupId} onChange={(e) => setGroupId(e.target.value)} required />
                </div>
                <div className='joinInputContent'>
                    <label className='joinLabel'>GroupName: </label>
                    <input className='joinInput' type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
                </div>
                <div className="btnDiv">
                    <button className="loginBtn" onClick={createGroup}>만들기</button>
                    <button className="joinBtn" onClick={goBack}>취소</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CreateGroup;
