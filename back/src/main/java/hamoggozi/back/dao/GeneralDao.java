package hamoggozi.back.dao;

import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.GroupUserBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface GeneralDao {

    void insertUser(UserBean userBean) throws Exception;

    UserBean getUser(String id);
    UserBean getUserExceptPw(String userId) throws Exception;

    void insertFile(FileBean fileBean) throws Exception;
    void deleteFile(String url) throws Exception;

    String checkAuth(@Param("groupUid") int groupUid, @Param("userUid") int userUid) throws Exception;
    int checkGroupUser(GroupUserBean groupUserBean) throws Exception;
    int checkGroupPost(@Param("groupUid") int groupUid, @Param("postUid") int postUid) throws Exception;
    int checkPostUser(@Param("postUid") int postUid, @Param("userUid") int userUid) throws Exception;
}
