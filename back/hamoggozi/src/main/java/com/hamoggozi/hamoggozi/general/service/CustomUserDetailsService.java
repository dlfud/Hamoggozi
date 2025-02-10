package com.hamoggozi.hamoggozi.general.service;

import com.hamoggozi.hamoggozi.dao.GeneralDao;
import com.hamoggozi.hamoggozi.dto.UserBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private GeneralDao generalDao;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        UserBean user = generalDao.getUser(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return User.builder()
                .username(user.getId())
                .password(user.getPw())
                .roles("SYSTEM")
                .build();
    }
}
