package com.hamoggozi.hamoggozi.oneLineDiary.controller;

import com.hamoggozi.hamoggozi.dto.OneLineDiaryBean;
import com.hamoggozi.hamoggozi.oneLineDiary.service.OneLineDiaryServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OneLineDiaryController {

    @Autowired
    private OneLineDiaryServiceI oneLineDiaryService;

    @RequestMapping(value="/diary/getOneLineDiaryList", method= RequestMethod.GET)
    public List<OneLineDiaryBean> getOneLineDiaryList() throws Exception{
        return oneLineDiaryService.getOneLineDiaryList();
    }

}
