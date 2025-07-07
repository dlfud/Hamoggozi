package com.hamoggozi.hamoggozi.jwt;

import com.hamoggozi.hamoggozi.dao.GeneralDao;
import com.hamoggozi.hamoggozi.dto.UserBean;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private GeneralDao generalDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserBean user = generalDao.getUser(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자 없음"));
        return new UserDetailsImpl(user);
    }
}
