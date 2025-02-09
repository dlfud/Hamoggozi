package com.hamoggozi.hamoggozi.general.controller;

import com.hamoggozi.hamoggozi.dto.OneLineDiaryBean;
import com.hamoggozi.hamoggozi.dto.UserBean;
import com.hamoggozi.hamoggozi.general.service.GeneralServiceI;
import com.hamoggozi.hamoggozi.oneLineDiary.service.OneLineDiaryServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GeneralController {

    @Autowired
    private GeneralServiceI generalService;

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public String login(@RequestBody UserBean userBean) throws Exception{
        System.out.println(userBean);
        return "success";
    }

}
