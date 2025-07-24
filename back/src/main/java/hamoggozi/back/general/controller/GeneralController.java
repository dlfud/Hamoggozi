package hamoggozi.back.general.controller;

import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import hamoggozi.back.general.service.GeneralServiceI;
import hamoggozi.back.jwt.JwtUtil;
import hamoggozi.back.jwt.RedisService;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class GeneralController {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RedisService redisService;
    @Autowired
    private GeneralServiceI generalService;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @RequestMapping(value="/validate-token", method=RequestMethod.GET)
    public ResponseEntity<Map<String, Boolean>> validateToken(HttpServletRequest request) {
        String token = jwtUtil.resolveToken(request);
        boolean isValid = false;

        if (token != null && jwtUtil.validateToken(token)) {
            // 블랙리스트 체크 로직 추가
            if (!redisService.isBlacklisted(token)) {
                isValid = true;
            }
        }

        Map<String, Boolean> response = new HashMap<>();
        response.put("valid", isValid);
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value="/join", method= RequestMethod.POST)
    public ResponseEntity<String> signup(@RequestBody UserBean userBean) throws Exception{
        userBean.setPw(passwordEncoder.encode(userBean.getPw()));
        userBean.setInsertBy(1);
        userBean.setUpdateBy(1);
        generalService.insertUser(userBean);
        return ResponseEntity.ok().body("회원가입에 성공하였습니다. 축하축하");
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody UserBean userBean) throws Exception{
        //secretKey 생성 로직
        /*byte[] keyBytes = Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded();
        String base64Key = Base64.getEncoder().encodeToString(keyBytes);
        System.out.println("Generated Key: " + base64Key);*/

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userBean.getId(), userBean.getPw())
        );

        UserBean searchUserInfo = generalService.getUserBean(userBean.getId());

        String token = jwtUtil.generateToken(userBean.getId(), searchUserInfo.getUid());
        return ResponseEntity.ok(token);
    }

    @RequestMapping(value="/logout", method=RequestMethod.POST)
    public ResponseEntity<String> logout(HttpServletRequest request) throws Exception{
        String token = jwtUtil.resolveToken(request);

        if (token != null && jwtUtil.validateToken(token)) {
            long ttl = jwtUtil.getExpiration(token).getTime() - System.currentTimeMillis();
            redisService.blacklistToken(token, ttl);
        }

        return ResponseEntity.ok("로그아웃 완료");
    }

    @RequestMapping(value="/getUserInfo", method=RequestMethod.GET)
    public ResponseEntity<UserBean> getUserInfo(HttpServletRequest request, @RequestHeader("Authorization") String authHeader) throws Exception{
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.getUsername(token);
        UserBean userBean = generalService.getUserBean(userId);

        return ResponseEntity.ok(userBean);
    }
}
