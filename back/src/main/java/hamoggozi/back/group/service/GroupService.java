package hamoggozi.back.group.service;

import hamoggozi.back.dao.GeneralDao;
import hamoggozi.back.dao.GroupDao;
import hamoggozi.back.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class GroupService implements GroupServiceI {
    @Autowired
    private GroupDao groupDao;

    @Override
    public List<GroupBean> getGroupList(UserBean userBean) throws Exception {
        return groupDao.getGroupList(userBean);
    }

    @Override
    public void insertGroup(GroupBean groupBean) throws Exception {
        groupDao.insertGroup(groupBean);

        GroupUserBean groupUserBean = new GroupUserBean();
        groupUserBean.setGroupUid(groupBean.getUid());
        groupUserBean.setUserUid(groupBean.getInsertBy());
        groupUserBean.setAuth("MANAGER");
        groupDao.insertGroupUser(groupUserBean);
    }

    @Override
    public int checkGroupUser(GroupUserBean groupUserBean) throws Exception {
        return groupDao.checkGroupUser(groupUserBean);
    }

    @Override
    public GroupBean getGroupInfo(GroupUserBean groupUserBean) throws Exception {
        return groupDao.getGroupInfo(groupUserBean);
    }
}
