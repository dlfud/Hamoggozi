package hamoggozi.back.general.controller;

import hamoggozi.back.dto.UserBean;
import hamoggozi.back.general.service.GeneralServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GeneralController {
    @Autowired
    private GeneralServiceI generalService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value="/join", method= RequestMethod.POST)
    public ResponseEntity<String> signup(@RequestBody UserBean userBean) throws Exception{
        userBean.setPw(passwordEncoder.encode(userBean.getPw()));
        userBean.setPhone("010-9788-4910");
        userBean.setAuth("ADMIN");
        userBean.setInsertBy(1);
        userBean.setUpdateBy(1);
        generalService.insertUser(userBean);
        return ResponseEntity.ok().body("회원가입에 성공하였습니다. 축하축하");
    }

}
