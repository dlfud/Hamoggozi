package com.hamoggozi.hamoggozi.dao;

import com.hamoggozi.hamoggozi.dto.UserBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface GeneralDao {

    int insertUserBean(UserBean userBean) throws Exception;

    UserBean getUser(String id);
}
