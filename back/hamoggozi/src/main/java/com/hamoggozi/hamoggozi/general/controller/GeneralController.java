package com.hamoggozi.hamoggozi.general.controller;

import com.hamoggozi.hamoggozi.dto.OneLineDiaryBean;
import com.hamoggozi.hamoggozi.dto.UserBean;
import com.hamoggozi.hamoggozi.general.service.GeneralServiceI;
import com.hamoggozi.hamoggozi.oneLineDiary.service.OneLineDiaryServiceI;
import com.hamoggozi.hamoggozi.util.JwtUtil;
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
    public ResponseEntity<?> login(@RequestBody UserBean userBean) throws Exception{
        System.out.println(userBean.getId());
        System.out.println(passwordEncoder.encode(userBean.getPw()));
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userBean.getId(), userBean.getPw())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(userBean.getId());
        System.out.println(token);
        System.out.println(ResponseEntity.ok(new AuthResponse(token)));

        return ResponseEntity.ok(new AuthResponse(token));
//        return "success";
    }

    class AuthResponse {
        private String token;

        public AuthResponse(String token) {
            this.token = token;
        }
    }

}
