package hamoggozi.back.dao;

import hamoggozi.back.dto.UserBean;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GeneralDao {

    void insertUser(UserBean userBean) throws Exception;

    UserBean getUser(String id);
}
