package hamoggozi.back.dao;

import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GeneralDao {

    void insertUser(UserBean userBean) throws Exception;

    UserBean getUser(String id);
    UserBean getUserExceptPw(String userId) throws Exception;

    void insertFile(FileBean fileBean) throws Exception;
    void deleteFile(String url) throws Exception;


}
