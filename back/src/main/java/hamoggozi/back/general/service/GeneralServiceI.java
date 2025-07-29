package hamoggozi.back.general.service;

import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;

public interface GeneralServiceI {
    void insertUser(UserBean userBean) throws Exception;

    UserBean getUserBean(String userId) throws Exception;

    void insertFile(FileBean fileBean) throws Exception;
    void deleteFile(String url) throws Exception;

    String checkAuth(int groupUid, int userUid) throws Exception;
    int checkGroupUser(int groupUid, int userUid) throws Exception;
    int checkGroupPost(int groupUid, int postUid) throws Exception;
    int checkPostUser(int postUid, int userUid) throws Exception;
}
