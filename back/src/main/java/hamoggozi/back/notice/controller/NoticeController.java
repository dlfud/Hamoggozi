package hamoggozi.back.notice.controller;

import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import hamoggozi.back.jwt.JwtUtil;
import hamoggozi.back.jwt.RedisService;
import hamoggozi.back.notice.service.NoticeServiceI;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class NoticeController {
    @Autowired
    private NoticeServiceI noticeService;

    @RequestMapping(value="/notice/getNotice", method=RequestMethod.POST)
    public ResponseEntity<NoticeBean> getNotice(@RequestBody NoticeBean noticeBean) throws Exception{
        return ResponseEntity.ok().body(noticeService.getNotice(noticeBean));
    }

    @RequestMapping(value="/notice/saveNotice", method=RequestMethod.POST)
    public ResponseEntity<Map<String, String>> saveNotice(@RequestBody NoticeBean noticeBean) throws Exception{
        Map<String, String> resultMap = new HashMap<>();

        noticeBean.setInsertBy(noticeBean.getUserUid());
        noticeBean.setUpdateBy(noticeBean.getUserUid());
        int result = noticeService.saveNotice(noticeBean);
        if(result > 0){
            resultMap.put("code", "200");
            resultMap.put("status", "success");
        }
        return ResponseEntity.ok().body(resultMap);
    }
}
