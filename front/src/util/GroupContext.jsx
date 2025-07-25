import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext(null);

export const GroupProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [groupList, setGroupList] = useState([]); 
  const [groupInfo, setGroupInfo] = useState(null); 

  return (
    <GroupContext.Provider value={{
      userInfo, setUserInfo,
      groupList, setGroupList,
      groupInfo, setGroupInfo
    }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => useContext(GroupContext);