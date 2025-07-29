package hamoggozi.back.dao;

import hamoggozi.back.dto.GroupBean;
import hamoggozi.back.dto.GroupUserBean;
import hamoggozi.back.dto.UserBean;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GroupDao {
    List<GroupBean> getGroupList(UserBean userBean) throws Exception;
    void insertGroup(GroupBean groupBean) throws Exception;
    void insertGroupUser(GroupUserBean groupUserBean) throws Exception;

    GroupBean getGroupInfo(GroupUserBean groupUserBean) throws Exception;
}
