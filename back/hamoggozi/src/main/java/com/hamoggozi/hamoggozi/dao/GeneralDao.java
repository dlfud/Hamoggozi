package com.hamoggozi.hamoggozi.dao;

import com.hamoggozi.hamoggozi.dto.UserBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GeneralDao extends JpaRepository<UserBean, Integer> {

    @Query(name="userBean.join", nativeQuery = true)
    UserBean join(UserDetails build);

    @Query(name="UserBean.getUser", nativeQuery = true)
    Optional<UserBean> getUser(String id);
}
