package com.hamoggozi.hamoggozi.general.service;

import com.hamoggozi.hamoggozi.dao.GeneralDao;
import com.hamoggozi.hamoggozi.dao.OneLineDiaryDao;
import com.hamoggozi.hamoggozi.dto.OneLineDiaryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeneralService implements GeneralServiceI {
    @Autowired
    private GeneralDao generalDao;


}
