package com.hamoggozi.hamoggozi.dao;

import com.hamoggozi.hamoggozi.dto.UserBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneralDao extends JpaRepository<UserBean, Integer> {
//    @Query(name = "OneLineDiaryBean.getOneLineDiaryList", nativeQuery = true)
//    List<OneLineDiaryBean> getOneLineDiaryList();


}
