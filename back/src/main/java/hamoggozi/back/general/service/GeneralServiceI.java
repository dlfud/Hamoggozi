package hamoggozi.back.general.service;

import hamoggozi.back.dto.UserBean;

public interface GeneralServiceI {
    void insertUser(UserBean userBean) throws Exception;

    UserBean getUserBean(String userId) throws Exception;
}
