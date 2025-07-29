package hamoggozi.back.notice.controller;

import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import hamoggozi.back.general.service.GeneralServiceI;
import hamoggozi.back.group.service.GroupServiceI;
import hamoggozi.back.jwt.JwtUtil;
import hamoggozi.back.jwt.RedisService;
import hamoggozi.back.notice.service.NoticeServiceI;
import io.jsonwebtoken.Claims;
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
    @Autowired
    private GroupServiceI groupService;
    @Autowired
    private GeneralServiceI generalService;
    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(value="/notice/getNotice", method=RequestMethod.POST)
    public ResponseEntity<NoticeBean> getNotice(@RequestBody NoticeBean noticeBean) throws Exception{
        return ResponseEntity.ok().body(noticeService.getNotice(noticeBean));
    }

    @RequestMapping(value="/notice/saveNotice", method=RequestMethod.POST)
    public ResponseEntity<Map<String, String>> saveNotice(@RequestHeader("Authorization") String authHeader, @RequestBody NoticeBean noticeBean) throws Exception{
        Map<String, String> resultMap = new HashMap<>();

        String token = authHeader.replace("Bearer ", "");
        Claims claims = jwtUtil.parseToken(token);
        int uid = claims.get("uid", Integer.class);
        noticeBean.setUid(uid);

        String auth = generalService.checkAuth(noticeBean.getGroupUid(), uid);
        int result = generalService.checkGroupUser(noticeBean.getGroupUid(), uid);
        if(result > 0 && "MANAGER".equals(auth)){
            noticeBean.setInsertBy(uid);
            noticeBean.setUpdateBy(uid);
            int res = noticeService.saveNotice(noticeBean);
            if(res > 0){
                resultMap.put("code", "200");
                resultMap.put("status", "success");
            }
        }else{
            resultMap.put("code", "200");
            resultMap.put("status", "fail");
            resultMap.put("message", "공지를 수정할 권한이 없습니다.");
        }
        return ResponseEntity.ok().body(resultMap);
    }
}
