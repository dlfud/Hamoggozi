package hamoggozi.back.group.controller;

import hamoggozi.back.dto.GroupBean;
import hamoggozi.back.dto.GroupUserBean;
import hamoggozi.back.dto.NoticeBean;
import hamoggozi.back.dto.UserBean;
import hamoggozi.back.general.service.GeneralServiceI;
import hamoggozi.back.group.service.GroupServiceI;
import hamoggozi.back.jwt.JwtUtil;
import hamoggozi.back.jwt.RedisService;
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
import java.util.List;
import java.util.Map;

@RestController
public class GroupController {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private GroupServiceI groupService;
    @Autowired
    private GeneralServiceI generalService;

    @RequestMapping(value="/group/getGroupList", method=RequestMethod.POST)
    public ResponseEntity<List<GroupBean>> getGroupList(@RequestBody UserBean userBean) throws Exception {
        return ResponseEntity.ok().body(groupService.getGroupList(userBean));
    }

    @RequestMapping(value="/group/getGroupInfo", method=RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> getGroupInfo(@RequestHeader("Authorization") String authHeader, @RequestBody GroupUserBean groupUserBean) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();

        String token = authHeader.replace("Bearer ", "");
        Claims claims = jwtUtil.parseToken(token);
        int uid = claims.get("uid", Integer.class);
        int result = generalService.checkGroupUser(groupUserBean.getGroupUid(), uid);
        if(result > 0){
            resultMap.put("status", "success");
            resultMap.put("code", "200");
            resultMap.put("result", groupService.getGroupInfo(groupUserBean));
        }else{
            resultMap.put("status", "fail");
            resultMap.put("code", "200");
            resultMap.put("message", "그룹에 속하지 않은 사용자 입니다.");
        }

        return ResponseEntity.ok().body(resultMap);
    }

    @RequestMapping(value="/group/insertGroup", method=RequestMethod.POST)
    public ResponseEntity<String> insertGroup(@RequestBody GroupBean groupBean) throws Exception {
        groupService.insertGroup(groupBean);
        return ResponseEntity.ok().body("그룹 생성");
    }
}
