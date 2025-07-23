package hamoggozi.back.group.service;

import hamoggozi.back.dto.*;

import java.util.List;

public interface GroupServiceI {
    List<GroupBean> getGroupList(UserBean userBean) throws Exception;
    void insertGroup(GroupBean groupBean) throws Exception;

    int checkGroupUser(GroupUserBean groupUserBean) throws Exception;
    GroupBean getGroupInfo(GroupUserBean groupUserBean) throws Exception;
}
