package hamoggozi.back.dao;

import hamoggozi.back.dto.FileBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GeneralDao {

    void insertUser(UserBean userBean) throws Exception;

    UserBean getUser(String id);

    void insertFile(FileBean fileBean) throws Exception;
    void deleteFile(String url) throws Exception;

    NoticeBean getNotice() throws Exception;
    int updateNotice() throws Exception;
    int insertNotice() throws Exception;
}
