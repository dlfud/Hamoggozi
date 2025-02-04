package com.hamoggozi.hamoggozi.dao;

import com.hamoggozi.hamoggozi.dto.OneLineDiaryBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OneLineDiaryDao extends JpaRepository<OneLineDiaryBean, Integer> {
    @Query(name="getOneLineDiaryList")
    public List<OneLineDiaryBean> getOneLineDiaryList();
}
