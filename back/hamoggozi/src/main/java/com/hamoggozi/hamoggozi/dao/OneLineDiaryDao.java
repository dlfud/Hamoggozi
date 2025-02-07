package com.hamoggozi.hamoggozi.dao;

import com.hamoggozi.hamoggozi.dto.OneLineDiaryBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OneLineDiaryDao extends JpaRepository<OneLineDiaryBean, Integer> {

//    @Query("SELECT OD.uid, OD.content, OD.userUid FROM OneLineDiaryBean OD")
//    @Query(value = "SELECT OD.uid, OD.content, OD.userUid FROM OneLineDiaryBean OD", nativeQuery = true)
    @Query(name = "OneLineDiaryBean.getOneLineDiaryList", nativeQuery = true)
    List<OneLineDiaryBean> getOneLineDiaryList();


}
