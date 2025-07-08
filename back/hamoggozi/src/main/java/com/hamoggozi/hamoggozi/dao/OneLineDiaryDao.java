package com.hamoggozi.hamoggozi.dao;

import com.hamoggozi.hamoggozi.dto.OneLineDiaryBean;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OneLineDiaryDao {

    List<OneLineDiaryBean> getOneLineDiaryList() throws Exception;


}
