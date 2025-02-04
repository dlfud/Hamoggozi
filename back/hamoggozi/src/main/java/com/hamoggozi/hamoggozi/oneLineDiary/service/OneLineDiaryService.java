package com.hamoggozi.hamoggozi.oneLineDiary.service;

import com.hamoggozi.hamoggozi.dao.OneLineDiaryDao;
import com.hamoggozi.hamoggozi.dto.OneLineDiaryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OneLineDiaryService{
    @Autowired
    private OneLineDiaryDao oneLineDiaryDao;

    public List<OneLineDiaryBean> getOneLineDiaryList(){
        return oneLineDiaryDao.getOneLineDiaryList();
    }
}
