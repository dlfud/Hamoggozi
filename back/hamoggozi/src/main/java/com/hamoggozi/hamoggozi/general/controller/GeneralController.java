package com.hamoggozi.hamoggozi.general.controller;

import com.hamoggozi.hamoggozi.dto.UserBean;
import com.hamoggozi.hamoggozi.general.service.GeneralServiceI;
import com.hamoggozi.hamoggozi.jwt.JwtUtil;
import com.hamoggozi.hamoggozi.jwt.RedisService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class GeneralController {

    @Autowired
    private GeneralServiceI generalService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RedisService redisService;

    private final AuthenticationManager authenticationManager;

//    //회원가입
    @RequestMapping(value="/join", method=RequestMethod.POST)
    public ResponseEntity<String> signup(@RequestBody UserBean userBean) throws Exception{
        userBean.setPw(passwordEncoder.encode(userBean.getPw()));
        userBean.setInsertBy(1);
        userBean.setUpdateBy(1);
        generalService.insertUserBean(userBean);
        return ResponseEntity.ok().body("회원가입에 성공하였습니다. 축하축하");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserBean userBean) throws Exception{
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userBean.getId(), userBean.getPw())
        );

        String token = jwtUtil.generateToken(userBean.getId());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) throws Exception{
        String token = jwtUtil.resolveToken(request);

        if (token != null && jwtUtil.validateToken(token)) {
            long ttl = jwtUtil.getExpiration(token).getTime() - System.currentTimeMillis();
            redisService.blacklistToken(token, ttl);
        }

        return ResponseEntity.ok("로그아웃 완료");
    }

}
