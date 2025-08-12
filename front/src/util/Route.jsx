export const routes = {
  // 게시글
  postList: (groupUid, category1Uid, category2Uid) => `/group/${groupUid}/post/postList/${category1Uid}/${category2Uid}`,
  postDetail: (groupUid, postUid) => `/group/${groupUid}/post/postDetail/${postUid}`,
  postInsert: (groupUid) => `/group/${groupUid}/post/postInsertPage`,
  postUpdate: (groupUid, postUid) => `/group/${groupUid}/post/postUpdatePage/${postUid}`,

  // 메인
  main: (groupUid) => `/group/${groupUid}`,

  // 그룹
  groupList: () => `/groupList`,
  createGroup: () => `/createGroup`,

  // setting
  profile: (groupUid) => `/group/${groupUid}/setting`,
  category: (groupUid) => `/group/${groupUid}/setting/category`,
};
