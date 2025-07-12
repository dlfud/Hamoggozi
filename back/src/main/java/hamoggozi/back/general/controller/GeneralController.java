package hamoggozi.back.general.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

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

    @RequestMapping(value="/join", method= RequestMethod.POST)
    public ResponseEntity<String> signup(@RequestBody UserBean userBean) throws Exception{
        userBean.setPw(passwordEncoder.encode(userBean.getPw()));
        userBean.setAuth("USER");
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

        String token = jwtUtil.generateToken(userBean.getId());
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

    @RequestMapping(value="/main", method=RequestMethod.GET)
    public ResponseEntity<String> main(HttpServletRequest request) throws Exception{
        return ResponseEntity.ok("mainPage");
    }
}
