package com.hamoggozi.hamoggozi.general.controller;

import com.hamoggozi.hamoggozi.dto.OneLineDiaryBean;
import com.hamoggozi.hamoggozi.dto.ShareResultBean;
import com.hamoggozi.hamoggozi.dto.UserBean;
import com.hamoggozi.hamoggozi.general.service.CustomUserDetailsService;
import com.hamoggozi.hamoggozi.general.service.GeneralServiceI;
import com.hamoggozi.hamoggozi.oneLineDiary.service.OneLineDiaryServiceI;
import com.hamoggozi.hamoggozi.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GeneralController {

    @Autowired
    private GeneralServiceI generalService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @RequestMapping(value="/login", method=RequestMethod.POST)
    public ShareResultBean login(@RequestBody UserBean userBean, HttpSession session, HttpServletRequest request, HttpServletResponse response) throws Exception{
        System.out.println(userBean.getId());
        System.out.println(passwordEncoder.encode(userBean.getPw()));
        ShareResultBean shareResultBean = new ShareResultBean();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userBean.getId(), userBean.getPw())
            );
        } catch (Exception e) {
            shareResultBean.setCode("500");
            shareResultBean.setResponse("Invalid username or password");
            return shareResultBean;
        }

        String token = jwtUtil.generateToken(userBean.getId());
        shareResultBean.setCode("200");
        shareResultBean.setResponse(token);

        return shareResultBean;
    }

    @RequestMapping(value="/logout", method=RequestMethod.POST)
    public ShareResultBean logout(HttpServletRequest request, HttpServletResponse response) throws Exception{
        request.getSession().invalidate();
        ShareResultBean shareResultBean = new ShareResultBean();
        shareResultBean.setCode("200");
        shareResultBean.setResponse("success");
        return shareResultBean;
    }
}
