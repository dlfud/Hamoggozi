package com.hamoggozi.hamoggozi.general.service;

import com.hamoggozi.hamoggozi.dao.GeneralDao;
import com.hamoggozi.hamoggozi.dto.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class GeneralService implements GeneralServiceI {
    @Autowired
    private GeneralDao generalDao;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public String join(UserBean userbean) {
        return generalDao.join(User.builder()
                .username(userbean.getId())
                .password(passwordEncoder.encode(userbean.getPw())) //password 인코딩(암호화하기)
                .build()).getId();
    }
}
