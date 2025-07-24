package hamoggozi.back.general.service;

import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;

public interface GeneralServiceI {
    void insertUser(UserBean userBean) throws Exception;

    UserBean getUserBean(String userId) throws Exception;

    void insertFile(FileBean fileBean) throws Exception;
    void deleteFile(String url) throws Exception;
}
